# KhasCom rebrand — handover notes

The site formerly published as **Meem / Meeem Organic World** is now **KhasCom**, a Pakistani
commodities export and import group. This file records what changed, what was assumed, and
what still needs the client's real data before launch.

## Placeholders that must be replaced before launch

These are live on the site right now as obvious placeholders. Nothing else is blocking.

| What | Where | Current placeholder |
|---|---|---|
| Head office address | `components/layout/Footer.tsx`, `app/(site)/contact-us/page.tsx` | `[Street address], Gulberg III, Lahore, Punjab, Pakistan` |
| Phone | same two files | `+92 300 000 0000` |
| WhatsApp number | `components/ui/FloatingWhatsApp.tsx` | `https://wa.me/920000000000` |
| Email addresses | Footer, contact page, `lib/auth.ts`, `prisma/seed.ts` | `info@khascom.com`, `export@khascom.com`, `admin@khascom.com` |
| Social links | `components/layout/Footer.tsx` | all `href="#"` (unchanged from the original site) |
| Canonical domain | `NEXT_PUBLIC_APP_URL` env var | falls back to `http://localhost:3000`; set this in production or `sitemap.xml`, `robots.txt` and OG tags will point at localhost |
| Twitter handle | `lib/seo.ts` | `@khascom` |

The Lahore address was chosen because the brief describes a Pakistani group; the original site
was Dubai-based. Swap in whatever the real registered office is.

## Assumptions made

- **Brand rendering** is `KhasCom` (mixed case) with the strapline **"Commodities Group"**,
  replacing "Organic World". Used in the header wordmark, footer wordmark and all metadata.
- **Positioning shifted from "organic" to "commodities."** The original copy leaned heavily on
  organic certification (USDA Organic tiles, "100% Certified Organic Products", "Bringing Nature
  To The World"). Since the brief describes a commodities export/import group rather than a
  certified-organic house, brand-level copy now says *Pakistani commodities* and the USDA Organic
  tile became *HACCP Certified*. If KhasCom does hold organic certification, that copy can go back.
- **Statistics were left as the original site had them** — "15+ Years Experience", "35+ Countries",
  "200+ Products", "1000+ Containers Exported", "99% Quality Inspection Pass Rate". These were
  inherited, not verified. Check them against reality.
- **The testimonials section has been removed.** Its three quotes were fictional, carried over
  from the original site, and once they named KhasCom they read as real client endorsements.
- **Blog article titles on the homepage are still fictional** and link to nothing. Supply real
  posts or drop the section.

## What changed

**Branding**
- Every `Meem` / `Meeem` / `Meem Organic World` / `meemorganicworld.com` reference replaced across
  `app/`, `components/`, `lib/`, `prisma/` and `package.json`. Zero remain.
- New logo `public/images/logo.png` (green badge, gold ring, serif K monogram with leaf) and a
  matching multi-resolution `app/favicon.ico`. The old `logo.webp` was **deleted** — it had
  "MEEM ORGANIC WORLD · DUBAI · UAE" baked into the artwork.
- The header now shows a **text wordmark next to the logo**. Previously the header carried the
  logo image alone, so the brand name never appeared in the navigation.

**Products added** (as requested — fruits & vegetables, Himalayan salt, dates, sesame seeds)
- `fresh-vegetables`: **Tinda (Apple Gourd)**, **Loki (Bottle Gourd)**, **Arvi (Taro Root)** —
  local names kept with the English name alongside, as asked.
- New category `himalayan-salt` — **Himalayan Pink Salt**: rock crystals, fine ground.
- New category `dates` — **Aseel Dates (Khairpur)**, **Ajwa Dates**, **Dry Dates (Chuara)**.
- New category `seeds-oilseeds` — **Natural White**, **Hulled** and **Black Sesame Seeds**.
- Catalogue is now 8 categories / 23 products, all with real photography. Every product has a
  working detail page.

The catalogue lives in `CATEGORY_DATA` in `app/(site)/products/[category]/page.tsx`, which drives
the category pages, the product detail pages and the `/products` grid. `prisma/seed.ts` mirrors the
same categories and slugs for the database-backed `/import` routes.

**Bugs fixed along the way**
- The `/products` grid's "View Specifications" button linked to the *category* page for every card,
  so the 23 product detail pages were unreachable from the catalogue. Now deep-links correctly.
- Footer "Premium Products" links pointed at `/import/*` slugs (`premium-rice`, `pink-salt`,
  `herbs-spices`) that have no matching category, and the Company column pointed at
  `/quality-logistics`, `/about-us/certifications` and `/sustainability`, none of which exist.
  All repointed at real routes.
- The homepage category cards and "Explore Products" CTA linked to `/import/*`, which 404s without
  a seeded database. Repointed at the static `/products/*` routes.
- `components/services/ServicesBanner.tsx` failed `tsc` on a framer-motion `Variants` type
  (pre-existing — the build could not complete). Annotated `: any` to match the pattern used in
  every other animated component in this codebase.
- Two pre-existing `react/no-unescaped-entities` lint errors fixed. `next build` and
  `eslint` are now both clean (15 warnings remain, all pre-existing and cosmetic).

## Product photography

The new product images are correctly-identified but amateur stock — a tinda on a white
background, arvi on a wooden table. They are accurate and legally clean, and they are
placeholders. Replace them with KhasCom's own product and packing-line photography before
launch; see `IMAGE-CREDITS.md` for what each file is and which three require attribution
if kept.

## Verified

- `npx next build` — passes, 51 pages generated.
- `npx eslint app components lib` — 0 errors.
- Dev server: all 8 category pages, all 23 product detail pages, home, about, contact and
  services return 200. All 13 new image assets serve through the Next image optimizer.
- No occurrence of "meem" in any rendered page.

## Left alone deliberately

Three one-off maintenance scripts at the repo root — `fix_bugs.py`, `fix_map.py` and
`generate_map.py` — still contain the string "meem", but only inside hardcoded absolute paths
from the original developer's machine (`D:\meem Organic World\Website\...`). They are dead
scripts: not part of the build, not shipped, and already broken since those paths do not exist
here. They are safe to delete. Nothing in `app/`, `components/`, `lib/`, `prisma/` or any
rendered page carries the old brand.

## Not done

- The database-backed `/import` and `/export` routes were not exercised — they need a live
  `DATABASE_URL` and `npx prisma db seed`. The seed data was updated to match the new catalogue
  but has not been run against a database.
