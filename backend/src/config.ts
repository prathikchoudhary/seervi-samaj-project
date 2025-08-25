if (!process.env.APP_ENV) {
  throw new Error("App environment string not provided");
}
if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("Database connection string not provided");
}
export const appEnv = <"production" | "development">process.env.APP_ENV;
export const dbConnectionString: string = process.env.DB_CONNECTION_STRING;