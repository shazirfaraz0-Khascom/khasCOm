# Deploying KhasCom to Vercel

The repository is deployment-ready. The database schema is already pushed and seeded
on Supabase. What remains is importing the repo and setting seven environment variables.

## 1. Import the project

Vercel → **Add New… → Project** → import `shazirfaraz0-Khascom/khasCOm`.

Leave every build setting at its default. The repository root *is* the Next.js app, so
**Root Directory** stays empty. `npm run build` already runs `prisma generate` first,
which Vercel needs because it restores `node_modules` from cache without re-running install.

## 2. Environment variables

Add all seven under **Settings → Environment Variables**, ticked for
**Production, Preview and Development**.

| Name | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres.ylaixzxcrdvbbvtuzbdz:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.ylaixzxcrdvbbvtuzbdz:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres` |
| `NEXTAUTH_SECRET` | a fresh 32-byte random string — `openssl rand -base64 32` |
| `NEXTAUTH_URL` | the deployed URL, e.g. `https://khascom.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | same as `NEXTAUTH_URL`, no trailing slash |
| `ADMIN_USERNAME` | `admin@khascom.com` |
| `ADMIN_PASSWORD` | the admin password |

### The password must be percent-encoded

`PASSWORD` above is not the raw password. Anything outside `A–Z a–z 0–9 - . _ ~` has to be
escaped, or the connection string parses wrongly and the database silently fails to connect:

| Character | Encode as | | Character | Encode as |
|---|---|---|---|---|
| `#` | `%23` | | `?` | `%3F` |
| `@` | `%40` | | `&` | `%26` |
| `/` | `%2F` | | `%` | `%25` |
| `:` | `%3A` | | `+` | `%2B` |

The current password ends in `#`, so its last character becomes `%23`.

### Why two database URLs

Supabase gives two connection strings for the same database:

- **`DATABASE_URL`** — port 6543, the transaction-mode pooler. What the running app uses.
  Serverless functions open and close connections constantly, and the pooler is what keeps
  that from exhausting Postgres.
- **`DIRECT_URL`** — port 5432, a session connection. Only the Prisma CLI uses it, for
  `db push`, `migrate` and `db seed`. Schema changes cannot run through a transaction pooler.

## 3. Deploy

Push to `main`, or hit **Deploy**. Then set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the
real URL Vercel assigns and redeploy once — until they match the live domain, sign-in
redirects and share previews point at the wrong host.

## 4. Verify

1. Home, `/products`, and a product page load.
2. `/contact-us/request-import-quote` — submit as Buyer, then as Seller.
3. `/contact-us/become-a-supplier` — submit an application.
4. `/admin/inquiries` while signed out → redirects to `/admin-login`.
5. Sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`, and confirm all four submissions appear.

## Database

Already done against Supabase — no action needed:

- `npx prisma db push` — 9 categories, 43 products, all inquiry tables created
- `npx prisma db seed` — catalogue seeded, SuperAdmin row created

To re-seed later: `npm run db:seed`. It clears and rebuilds the catalogue but **never**
touches `QuoteRequest`, `SupplierApplication` or `ContactMessage`, so customer inquiries
survive a re-seed.

## Where inquiries land

| Form | Table | Admin section |
|---|---|---|
| Request quote → Buyer tab | `QuoteRequest` (`type: Import`) | Buyer & Seller Inquiries |
| Request quote → Seller tab | `QuoteRequest` (`type: Export`) | Buyer & Seller Inquiries |
| Become a Supplier | `SupplierApplication` | Supplier Applications |
| Contact form | `ContactMessage` | Contact Messages |

All four appear at `/admin/inquiries`, newest first, with counts across the top.

## Security notes

- **`/admin` is gated by `proxy.ts`**, which runs before rendering. Checking the session in
  the admin layout alone was not enough: React renders the page in parallel with the layout,
  so the redirect still shipped the full admin HTML in the response body — every buyer email
  and phone number was readable with a single `curl`. Do not remove `proxy.ts`, and do not
  narrow its matcher.
- **Rotate the Supabase password** before going live. It has been shared in plain text during
  development. Supabase → Settings → Database → Reset database password, then update
  `DATABASE_URL` and `DIRECT_URL` on Vercel.
- **Consider making the GitHub repository private.** It carries the handover notes and every
  placeholder value, though no credentials — `.gitignore` excludes `.env*`.
