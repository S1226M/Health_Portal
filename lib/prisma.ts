import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Build a connection URL from components if DATABASE_URL is not set
const builtDatabaseUrl =
  process.env.DATABASE_URL ??
  (process.env.DB_USER
    ? `mysql://${process.env.DB_USER}:${encodeURIComponent(
      process.env.DB_PASS ?? ""
    )}@${process.env.DB_HOST ?? "localhost"}:${process.env.DB_PORT ?? "3306"}/${process.env.DB_NAME ?? ""}`
    : undefined);

if (!builtDatabaseUrl) {
  throw new Error(
    "DATABASE_URL or DB_* environment variables are not set. Please add them to your .env or .env.local file"
  );
}

// Set process.env.DATABASE_URL when we built it from components so Prisma's
// runtime (and TypeScript types) can rely on the existing `prisma.config.ts`.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = builtDatabaseUrl;
}

// Log DATABASE_URL at runtime to diagnose missing env during SSR module evaluation.
// Keep output concise for debugging.
/* eslint-disable no-console */
console.log("[prisma] DATABASE_URL present at init:",
  process.env.DATABASE_URL ? String(process.env.DATABASE_URL).slice(0, 200) : undefined
);
/* eslint-enable no-console */

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
