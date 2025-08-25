import pool from "../config/db.js";

// Get all programs (limit 10 for testing)
export const getPrograms = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM programs LIMIT 10");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching programs:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
