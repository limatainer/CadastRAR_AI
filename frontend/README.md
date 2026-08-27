# CadastRAR

AI-assisted record registration with PDF export. Try free for 7 days.

![Screenshot](frontend/public/logo.png)

## What it is

CadastRAR is a tool for recording people. A user enters four fields &mdash; name, avatar URL, description, and tags &mdash; optionally with AI help, and exports the result as a PDF in one of three formats: an ID card, a certificate, or a profile sheet.

## Features

- **4 fields per record**: name, avatar, description, tags
- **AI-assisted bios**: one Gemini call generates a 2&ndash;3 sentence bio
- **3 PDF formats**: ID card, certificate, profile sheet
- **7-day free trial**, no payment information required
- **One-time payment of &euro;50**, no subscription

## Stack

- Vite + React 18
- Tailwind CSS + semantic tokens
- Firebase Auth + Firestore
- Gemini API (single call for AI bio generation)
- Stripe Checkout (payment link & webhook)

## Folder

Use ALWAYS Feature-based
-organize by what the code does

## RULE

- Always write code using YAGNI
- Always answer as /caveman ultra
- Never Hardcode any color or style always use tailwind tokes .css variables

## Local dev

```bash
cd frontend

# Install dependencies
pnpm install

# Copy env example
cp .env.example .env.local
# Fill in your Firebase public config and VITE_GEMINI_API_KEY
# For the webhook server, set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FIREBASE_SERVICE_ACCOUNT

# Start the dev server
pnpm run dev

# Type check
pnpm tsc --noEmit

# Lint
pnpm run lint

# Build
pnpm run build
```

### Firestore security rules test

```bash
pnpm install -g firebase-tools
firebase emulators:start --only firestore &
node test/rules.test.mjs
```

### Stripe webhook server

```bash
node api/stripe-webhook.ts
```

Requires `FIREBASE_SERVICE_ACCOUNT`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` in `.env`.

## License

MIT
