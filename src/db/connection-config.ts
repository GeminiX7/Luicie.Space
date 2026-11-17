export function getDatabaseConnectionConfig(databaseUrl: string) {
  const ca = process.env.DATABASE_CA_CERT?.replace(/\\n/g, "\n").trim();

  if (!ca) {
    return { url: databaseUrl };
  }

  const url = new URL(databaseUrl);
  for (const parameter of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) {
    url.searchParams.delete(parameter);
  }

  return {
    url: url.toString(),
    ssl: { ca, rejectUnauthorized: true as const },
  };
}
