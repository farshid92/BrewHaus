import { Router, raw, json } from 'express'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { db } from '../db/index.js'
import { orders, orderItems, products } from '../db/schema.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { stripe } from '../lib/stripe.js'

export const checkoutRouter = Router()

checkoutRouter.post('/', json(), requireAuth, async (req, res) => {
  const { productId, quantity } = req.body

  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1)
  if (!product) return res.status(404).json({ error: 'No such product' })

  const qty = Math.max(1, Number(quantity) || 1)
  const totalCents = product.priceCents * qty

  const orderId = randomUUID()
  await db.insert(orders).values({
    id: orderId,
    userId: req.userId,
    status: 'pending',
    totalCents,
  })

  await db.insert(orderItems).values({
    id: randomUUID(),
    orderId,
    productId: product.id,
    nameAtPurchase: product.name,
    unitPriceCents: product.priceCents,
    quantity: qty,
  })

  const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173'
  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: req.userEmail,
    line_items: [
      {
        quantity: qty,
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            images: [`${clientUrl}${product.imageUrl}`],
          },
        },
      },
    ],
    metadata: { orderId },
    success_url: `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/products/${product.slug}?canceled=1`,
  })

  await db.update(orders).set({ stripeSessionId: stripeSession.id }).where(eq(orders.id, orderId))

  res.json({ url: stripeSession.url })
})

checkoutRouter.post('/webhook', raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.orderId

    if (orderId) {
      await db.update(orders).set({ status: 'paid' }).where(eq(orders.id, orderId))
      console.log(`Order ${orderId} marked paid`)
    }
  }

  res.json({ received: true })
})