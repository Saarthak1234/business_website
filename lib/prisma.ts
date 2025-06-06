import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

//The following line extends the global scope (in Node.js) to allow storing a singleton instance of the Prisma client.

const globalForPrisma = global as unknown as {
    prisma_client: PrismaClient;
}

const prisma = globalForPrisma.prisma_client || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_client = prisma;

export default prisma;