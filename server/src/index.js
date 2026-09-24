import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import { productsRouter } from './routes/products.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)

// better-auth needs the raw request body, so it's mounted before express.json().
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

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