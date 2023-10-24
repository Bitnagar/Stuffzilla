# Welcome to Stuffzilla

**_Stuffzilla_** is an ecommerce store built with Typescript, Next.js App router, MongoDB, TailwindCSS and Clerk Auth. Features cart checkouts, 4+ product categories and more.

## Run Locally

Clone the project

```bash
git clone https://github.com/Bitnagar/Stuffzilla.git
```

Go to the project directory

```bash
cd Stuffzilla
```

Copy `.env` from `.env.example`

```bash
cp .env.example .env
```

Create an account on Stripe, ClerkJS and MongoDB. Get all the API keys listed below and copy them in the `.env` file.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
WEBHOOK_SECRET=<your-svix-webhook-secret>
DATABASE_URL=<your-mongoDB-database-URL>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
```

Install dependencies.

```bash
npm install
```

Start the server.

```bash
npm run dev
```

Create a production build.

```bash
npm run build
```

Start the production build.

```bash
npm run start
```

## Roadmap

- Improve UI.
- Add Framer Motion.
- Checkout process:
  - Improve UI.
  - Checkout success and active URLs need to be created.
  - Update cart database after checkout.
- Add containerisation with Docker.

## Tech Stack

### Typescript, Next.js, MongoDB, TailwindCSS, Clerk
