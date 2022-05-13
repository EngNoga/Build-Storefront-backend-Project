import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;
console.log(`the current environment is ${ENV}`);
const currentDatabase = ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB;
console.log("the current database " + currentDatabase);

const client = new Pool({
  host: POSTGRES_HOST,
  database: currentDatabase,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
