import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

export async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  if (!session?.user) {
    return res.status(401).json({ error: 'You need to be signed in to do that.' })
  }

  req.userId = session.user.id
  req.userEmail = session.user.email
  next()
}