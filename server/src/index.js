import { webcrypto } from 'node:crypto'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import { productsRouter } from './routes/products.js'
import { checkoutRouter } from './routes/checkout.js'
import { ordersRouter } from './routes/orders.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)
// ORDER-SENSITIVE: checkout is mounted before express.json() so the webhook route can read the raw request body for Stripe's signature verification.

app.use('/api/checkout', checkoutRouter)

// better-auth also needs to run before express.json().
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.use('/api/orders', ordersRouter)

app.use('/api/products', productsRouter)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

app.use('/api/*splat', (_req, res) => {
  res.status(404).json({ error: 'No such endpoint' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something broke on our side.' })
})

app.listen(PORT, () => {
  console.log(`BrewHaus API listening on http://localhost:${PORT}`)
})
