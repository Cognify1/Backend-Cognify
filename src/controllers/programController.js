import pool from "../config/db.js";

// GET all programs
export const getPrograms = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM programs");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching programs:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET program by id
export const getProgramById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM programs WHERE program_id = $1",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Program not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching program:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE new program
export const createProgram = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO programs (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating program:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE program
export const updateProgram = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            "UPDATE programs SET title = $1, description = $2 WHERE program_id = $3 RETURNING *",
            [title, description, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Program not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating program:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE program
export const deleteProgram = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM programs WHERE program_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Program not found" });
        res.json({ message: "Program deleted successfully" });
    } catch (err) {
        console.error("Error deleting program:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
