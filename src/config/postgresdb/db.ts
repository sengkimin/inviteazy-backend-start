import { Pool } from "pg";

let poolInstance: Pool | null = null;

export const connectPostgresDb = (): Pool => {
  if (!poolInstance) {
    poolInstance = new Pool({
      user: "inviteazy",
      host: "localhost",
      database: "mydb",
      password: "12345678",
      port: 5433,
    });
    console.log(" Connected to Postgres!");
  }

  return poolInstance;
};
