import { createPool } from "mysql2/promise";

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "test";
const DB_NAME = process.env.DB_NAME || "urlShortener";
const DB_PORT = process.env.DB_PORT || 3306;

const pool = createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
});

console.log("pool", pool);

export default pool;
