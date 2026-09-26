import { Router } from 'express'
import { eq, and } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders } from '../db/schema.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const ordersRouter = Router()

ordersRouter.get('/session/:sessionId', requireAuth, async (req, res) => {
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.stripeSessionId, req.params.sessionId), eq(orders.userId, req.userId)))
    .limit(1)

  if (!order) return res.status(404).json({ error: 'No such order' })
  res.json(order)
})