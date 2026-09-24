import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { signIn, signUp } from '../lib/auth-client'

export function Login({ mode }) {
  const navigate = useNavigate()
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

      navigate('/')
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">
        {mode === 'signup' ? 'Create an account' : 'Welcome back'}
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {mode === 'signup' ? 'Takes less than a minute.' : 'Sign in to continue.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === 'signup' && (
          <Field label="Name" name="name" type="text" autoComplete="name" required />
        )}
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          minLength={8}
          required
          hint="At least 8 characters."
        />

        {error && (
          <p role="alert" className="rounded-lg bg-ember/10 px-3 py-2 text-sm text-ember">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full cursor-pointer rounded-full bg-ember px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? 'One moment...' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        {mode === 'signup' ? (
          <>Already have one? <Link to="/login" className="text-ember underline">Sign in</Link></>
        ) : (
          <>New here? <Link to="/signup" className="text-ember underline">Create an account</Link></>
        )}
      </p>
    </div>
  )
}

function Field({ label, hint, name, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="mt-1.5 h-11 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-clay"
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
    </div>
  )
}