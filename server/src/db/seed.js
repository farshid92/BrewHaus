import { randomUUID } from 'node:crypto'
import { db } from './index.js'
import { products, productImages } from './schema.js'
import { productsData } from './products.data.js'

async function seed() {
  console.log('Seeding products...')

  for (const p of productsData) {
    const id = randomUUID()

    const [inserted] = await db
      .insert(products)
      .values({ id, ...p })
      .onConflictDoNothing({ target: products.slug })
      .returning()

    if (inserted) {
      await db.insert(productImages).values({
        id: randomUUID(),
        productId: inserted.id,
        url: inserted, imageUrl,
        sortOrder: 0,
      })
    }
  }

  console.log(`Done — seeded ${productsData.length} products.`)
  process.exit(0)
}

seed()