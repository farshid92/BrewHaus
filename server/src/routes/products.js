import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { products } from '../db/schema.js'

export const productsRouter = Router()

productsRouter.get('/', async (_req, res) => {
  const rows = await db.select().from(products)
  res.json(rows)
})

productsRouter.get('/:slug', async (req, res) => {
  const [row] = await db.select().from(products).where(eq(products.slug, req.params.slug)).limit(1)
  if (!row) return res.status(404).json({ error: 'No such product' })
  res.json(row)
})