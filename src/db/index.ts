import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getDatabaseConnectionConfig } from "@/db/connection-config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const connectionConfig = getDatabaseConnectionConfig(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: connectionConfig.url,
    ssl: connectionConfig.ssl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
