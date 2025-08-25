import pool from "../config/db.js";

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users LIMIT 10");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
