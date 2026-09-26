import 'dotenv/config'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Add it to .env (use a sk_test_ key).')
}

if (process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
  throw new Error('That is a LIVE Stripe key. This project is test-mode only. Use the sk_test_ key.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)