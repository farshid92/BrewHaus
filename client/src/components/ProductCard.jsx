import { useState } from 'react'
import { QuantityStepper } from './QuantityStepper'
import { formatPrice } from '../lib/format'
import { Link } from 'react-router'

export function ProductCard({ product }) {
  const [qty, setQty] = useState(1)

  return (
    <article className="overflow-hidden rounded-2xl border border-line transition hover:shadow-lg">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-2xl border border-line transition hover:shadow-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-[180px] w-full object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-ink-soft">{product.category}</p>
          <p className="mt-1 font-semibold text-ember">{formatPrice(product.priceCents)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <QuantityStepper value={qty} onChange={setQty} />
      </div>
    </article>
  )
}