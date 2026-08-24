import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma 7 dropped the `datasources` / `datasourceUrl` client options: a driver
 * adapter is now the only way to reach Postgres directly. `prisma/schema.prisma`
 * therefore declares no `url` on the datasource, and the connection string is
 * handed to the adapter here instead.
 */
function createClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

const READ_PREFIXES = ['find', 'count', 'aggregate', 'groupBy']

/**
 * Stand-in used when no DATABASE_URL is configured, so the marketing pages still
 * render on a deployment with no database attached.
 *
 * Reads resolve empty. Writes throw — a form that silently reports success while
 * dropping the submission is worse than one that reports failure.
 */
function offlineModel(model: string) {
  return new Proxy({}, {
    get: (_target, method) => async () => {
      const name = String(method)

      if (!READ_PREFIXES.some((p) => name.startsWith(p))) {
        throw new Error(
          `Cannot run ${model}.${name}() — DATABASE_URL is not set. ` +
          `Attach a database to persist and read this data.`
        )
      }

      if (name.startsWith('findMany')) return []
      if (name.startsWith('count')) return 0
      return null
    },
  })
}

export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    if (typeof prop === 'symbol' || prop === 'then') return undefined

    const model = String(prop)

    if (!process.env.DATABASE_URL) {
      return offlineModel(model)
    }

    if (!globalForPrisma.prisma) {
      try {
        globalForPrisma.prisma = createClient()
      } catch (error) {
        console.error('Prisma client failed to initialise:', error)
        return offlineModel(model)
      }
    }

    return (globalForPrisma.prisma as never as Record<string, unknown>)[model]
      ?? offlineModel(model)
  },
})
