import { useState } from 'react'
import { products } from '../data/products'
import { ProductCard } from './ProductCard'

const categories = ['All', 'Beans', 'Equipment']

export function Shop() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? products : products.filter((p) => p.category === filter)

  return (
    <section id="shop" className="mx-auto max-w-[1100px] px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">This week's picks</h2>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${filter === cat
                ? 'bg-ember text-white'
                : 'border border-line text-ink-soft hover:border-clay'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}