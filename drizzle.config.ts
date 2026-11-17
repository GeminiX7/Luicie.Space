import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { getDatabaseConnectionConfig } from "./src/db/connection-config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run Drizzle migrations");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: getDatabaseConnectionConfig(databaseUrl),
});
