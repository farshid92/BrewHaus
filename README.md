# BrewHaus

A coffee bean & equipment e-commerce site, built step by step while learning
HTML, CSS, JavaScript/React, a backend, and payments.

## Live

- **Site**: https://brew-haus-zeta.vercel.app
- **API**: https://brewhaus-production.up.railway.app

## Tech stack

- **Frontend**: React (JavaScript) + Vite + Tailwind CSS v4, React Router
- **Backend**: Express + Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Auth**: better-auth (email/password)
- **Hosting**: Vercel (frontend), Railway (backend)

## Project structure

- `client/` — React app (Vite)
- `server/` — Express API + Drizzle schema

## Run it locally

**Backend:**

cd server
npm install
# copy .env.example to .env and fill in a real Neon DATABASE_URL + a generated BETTER_AUTH_SECRET
npm run db:push
npm run db:seed
npm run dev

**Frontend** (in a separate terminal):

cd client
npm install
npm run dev

Then open `http://localhost:5173`.

## Roadmap

- [x] Week 1 — Static HTML/CSS landing page
- [x] Week 2 — React + Tailwind, client-side interactivity
- [x] Week 3 — Backend API + Postgres, deployed live, with auth
- [ ] Week 4 — Stripe checkout, tests, CI/CD