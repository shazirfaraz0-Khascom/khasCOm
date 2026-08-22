# KhasCom

Marketing and trade site for **KhasCom**, a Pakistani commodities export and import group
supplying international wholesale buyers with fresh fruits and vegetables, Himalayan pink salt,
dates, sesame seeds, rice and grains.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Prisma 7 and NextAuth.

## Getting started

```bash
npm install
npx prisma generate      # required before the first build
npm run dev
```

Open <http://localhost:3000>.

`npx prisma generate` is not optional — without it the Prisma client has no types and
`next build` fails type checking.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Canonical site URL. Used for `sitemap.xml`, `robots.txt` and Open Graph tags. Defaults to `http://localhost:3000`. **Set this in production.** |
| `DATABASE_URL` | Postgres connection string. The marketing pages render without it; the admin portal, blog and the `/import` and `/export` routes need it. |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | NextAuth session config for the admin portal. |

Seed the catalogue once a database is connected:

```bash
npx prisma db seed
```

## Where things live

| Path | What |
|---|---|
| `app/(site)/` | Public marketing pages |
| `app/(admin)/` | Admin portal (blog, inquiries, products) |
| `app/(site)/products/[category]/page.tsx` | **`CATEGORY_DATA` — the product catalogue.** Drives the category pages, the product detail pages and the `/products` grid. Edit here to add or change products. |
| `prisma/seed.ts` | Database mirror of the same categories and slugs |
| `components/layout/` | Header and footer |
| `components/home/HomeClient.tsx` | The homepage sections |
| `lib/seo.ts` | Default metadata and the `constructMetadata` helper |
| `public/images/` | All imagery. See `IMAGE-CREDITS.md`. |

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Before launch

Read `REBRAND-NOTES.md`. Contact details, the WhatsApp number, social links and the canonical
domain are all placeholders, and the product photography should be replaced with KhasCom's own.
