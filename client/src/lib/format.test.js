import { describe, it, expect } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {
  it('formats whole dollar amounts with two decimal places', () => {
    expect(formatPrice(1800)).toBe('$18.00')
  })

  it('formats amounts with cents correctly', () => {
    expect(formatPrice(1850)).toBe('$18.50')
  })

  it('formats zero as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })
})