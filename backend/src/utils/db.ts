import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const db = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
