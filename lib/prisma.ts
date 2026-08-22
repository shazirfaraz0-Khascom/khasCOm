import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createDummyTarget = () => new Proxy({}, {
  get: () => async () => []
});

export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (typeof prop === 'symbol' || prop === 'then') return undefined;

    if (!process.env.DATABASE_URL) {
      return createDummyTarget();
    }
    
    if (!globalForPrisma.prisma) {
      try {
        globalForPrisma.prisma = new PrismaClient();
      } catch (e) {
        return createDummyTarget();
      }
    }

    const model = (globalForPrisma.prisma as any)[prop];
    if (!model) {
      return createDummyTarget();
    }
    return model;
  }
});
