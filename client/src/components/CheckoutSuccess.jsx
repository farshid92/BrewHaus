import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router'

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    let attempts = 0
    let cancelled = false

    async function poll() {
      attempts += 1

      try {
        const response = await fetch(`/api/orders/session/${sessionId}`, { credentials: 'include' })
        const order = await response.json()

        if (cancelled) return

        if (order.status === 'paid') {
          setStatus('paid')
          return
        }

        if (attempts >= 5) {
          setStatus('pending')
          return
        }

        setTimeout(poll, 2000)
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    poll()

    return () => {
      cancelled = true
    }
  }, [sessionId])

  return (
    <div className="mx-auto max-w-[600px] px-6 py-20 text-center">
      {status === 'checking' && <p className="text-ink-soft">Confirming your payment...</p>}

      {status === 'paid' && (
        <>
          <h1 className="text-3xl font-bold text-ember">Thank you!</h1>
          <p className="mt-2 text-ink-soft">Your order is confirmed.</p>
        </>
      )}

      {status === 'pending' && (
        <>
          <h1 className="text-2xl font-bold">Still processing</h1>
          <p className="mt-2 text-ink-soft">
            Your payment is being confirmed. This can take a moment — check back shortly.
          </p>
        </>
      )}

      {status === 'error' && (
        <p className="text-ink-soft">Something went wrong confirming your order.</p>
      )}

      <Link to="/" className="mt-6 inline-block text-ember underline">Back to shop</Link>
    </div>
  )
}