import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on("connect", () => {
    console.log("✅ Connected to Cognify database");
});

pool.on("error", (err) => {
    console.error("❌ Cognify database connection error:", err);
    process.exit(-1);
});

export default pool;
