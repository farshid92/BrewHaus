import { useState } from 'react'
import { signIn, signUp } from '../lib/auth-client'

export function AuthModal({ onClose }) {
  const [mode, setMode] = useState('signin')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setBusy(true)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email'))
    const password = String(form.get('password'))
    const name = String(form.get('name') ?? '')

    try {
      const result =
        mode === 'signup'
          ? await signUp.email({ email, password, name })
          : await signIn.email({ email, password })

      if (result.error) {
        setError(result.error.message ?? 'That did not work. Try again?')
        return
      }

      onClose()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-bg p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {mode === 'signup' ? 'Create an account' : 'Welcome back'}
          </h2>
          <button type="button" onClick={onClose} className="text-ink-soft hover:text-ember">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input id="name" name="name" type="text" required className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-clay" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-clay" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input id="password" name="password" type="password" minLength={8} required className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-clay" />
          </div>

          {error && <p role="alert" className="rounded-lg bg-ember/10 px-3 py-2 text-sm text-ember">{error}</p>}

          <button type="submit" disabled={busy} className="w-full rounded-full bg-ember py-2.5 font-semibold text-white transition disabled:opacity-50">
            {busy ? 'One moment…' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-soft">
          {mode === 'signup' ? (
            <>Already have one? <button type="button" onClick={() => setMode('signin')} className="text-ember underline">Sign in</button></>
          ) : (
            <>New here? <button type="button" onClick={() => setMode('signup')} className="text-ember underline">Create an account</button></>
          )}
        </p>
      </div>
    </div>
  )
}