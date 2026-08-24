import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * CLI-time configuration only (`prisma generate`, `db push`, `migrate`, `db seed`).
 * The application's own connection is created in `lib/prisma.ts`, which passes
 * DATABASE_URL to the Postgres driver adapter.
 *
 * Pooled connections (Supabase port 6543 / pgbouncer) cannot run schema changes,
 * so the CLI prefers DIRECT_URL — the session-mode connection on port 5432 —
 * and only falls back to DATABASE_URL when no direct URL is configured.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url:
      process.env["DIRECT_URL"] ||
      process.env["DATABASE_URL"] ||
      "postgresql://dummy:dummy@localhost:5432/dummy?schema=public",
  },
});
