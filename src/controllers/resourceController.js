import pool from "../config/db.js";

// GET all resources
export const getResources = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM resources");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching resources:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET resource by id
export const getResourceById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM resources WHERE resource_id = $1",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Resource not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching resource:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE new resource
export const createResource = async (req, res) => {
    const { title, url, category } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO resources (title, url, category) VALUES ($1, $2, $3) RETURNING *",
            [title, url, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating resource:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE resource
export const updateResource = async (req, res) => {
    const { id } = req.params;
    const { title, url, category } = req.body;
    try {
        const result = await pool.query(
            "UPDATE resources SET title = $1, url = $2, category = $3 WHERE resource_id = $4 RETURNING *",
            [title, url, category, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Resource not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating resource:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE resource
export const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM resources WHERE resource_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Resource not found" });
        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error("Error deleting resource:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};