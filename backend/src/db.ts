import { App, AppConfig } from "blazend";
import { dbConnectionString } from "./config";

const appConfig: AppConfig = {
  db: {
    config: {
      dbType: "postgres",
      conn: dbConnectionString,
      schema: "public",
      debug: false,
    },
    onConnectionSuccess: () => console.info("Connected to db successfully!"),
    onConnectionFailure: (error) => console.error("Error connecting to database", error),
  },
};

const app = new App(appConfig);

const db = app.modules.db;
export default db;
