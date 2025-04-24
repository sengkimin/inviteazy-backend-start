import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "vorleak",
    host: "localhost",
    database: "mydb",
    password: "123456",
    port: 5436,
  });
  return pool;
};
