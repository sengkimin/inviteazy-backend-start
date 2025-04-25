import { Pool } from "pg";

let poolInstance: Pool | null = null;

export const connectPostgresDb = (): Pool => {
  if (!poolInstance) {
    poolInstance = new Pool({
      user: "vorleak",
      host: "localhost",
      database: "mydb",
      password: "123456",
      port: 5436,
    });
    console.log("Connected to Postgres!");
  }

  return poolInstance;
};
