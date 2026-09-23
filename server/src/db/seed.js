import { randomUUID } from 'node:crypto'
import { db } from './index.js'
import { products } from './schema.js'
import { productsData } from './products.data.js'

async function seed() {
  console.log('Seeding products...')

  for (const p of productsData) {
    await db
      .insert(products)
      .values({ id: randomUUID(), ...p })
      .onConflictDoNothing({ target: products.slug })
  }

  console.log(`Done — seeded ${productsData.length} products.`)
  process.exit(0)
}

seed()