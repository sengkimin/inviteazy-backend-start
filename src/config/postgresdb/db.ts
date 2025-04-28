import { Pool } from "pg";

let poolInstance: Pool | null = null;

export const connectPostgresDb = (): Pool => {
  if (!poolInstance) {
    poolInstance = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });

    console.log("Connected to PostgreSQL!");
  }

  return poolInstance;
};

// import { Pool } from "pg";

// let poolInstance: Pool | null = null;

// export const connectPostgresDb = (): Pool => {
//   if (!poolInstance) {
//     poolInstance = new Pool({
//       user: "inviteazy",     
//       host: "localhost",
//       database: "mydb",
//       password: "12345678", 
//       port: 5433,            
//     });

//     console.log("Connected to PostgreSQL!");
//   }

//   return poolInstance;
// }

// }
//   return poolInstance;
//   const pool = new Pool({
//     user: "vorleak",
//     host: "localhost",
//     database: "mydb",
//     password: "123456",
//     port: 5436,
//   });
//   return pool;
// };
// import { Pool } from "pg";

// export const connectPostgresDb = (): Pool => {
//   const pool = new Pool({
//     user: "postgres",
//     host: "62.72.46.248",
//     database: "inviteazy_ilt",
//     password: "NZt3C7DPfWnZyy8N",
//     port: 5432,
//   });
//   return pool;

// import { Pool } from "pg";

// let poolInstance: Pool | null = null;

// export const connectPostgresDb = (): Pool => {
//   if (!poolInstance) {
//     poolInstance = new Pool({
//       user: "vorleak",
//       host: "localhost",
//       database: "mydb",
//       password: "123456",
//       port: 5436,
//     });
//     console.log("Connected to Postgres!");
//   }

//   return poolInstance;

// };

// F2vDAVrZXNbTnVm3
