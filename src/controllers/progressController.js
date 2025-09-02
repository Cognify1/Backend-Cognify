import pool from "../config/db.js";

// GET all progress records
export const getAllProgress = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT p.*, u.email, l.title AS lesson_title
             FROM progress p
             INNER JOIN users u ON p.user_id = u.user_id
             INNER JOIN lessons l ON p.lesson_id = l.lesson_id
             ORDER BY p.updated_at DESC`
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET progress by user
export const getProgressByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.*, l.title AS lesson_title
             FROM progress p
             INNER JOIN lessons l ON p.lesson_id = l.lesson_id
             WHERE p.user_id = $1
             ORDER BY l.order_index ASC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching user progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET progress by id
export const getProgressById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM progress WHERE progress_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Progress not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET progress for a specific program and user (includes ALL lessons)
export const getProgressByUserAndProgram = async (req, res) => {
    const { userId, programId } = req.params;

    try {
        // Query to get ALL lessons in the program with their progress status
        const result = await pool.query(`
            SELECT 
                COALESCE(p.progress_id, NULL) as progress_id,
                $1 as user_id,
                l.lesson_id,
                COALESCE(p.completed, false) as completed,
                p.completed_at,
                p.updated_at,
                l.title as lesson_title,
                c.course_id,
                c.title as course_title
            FROM lessons l
            INNER JOIN courses c ON l.course_id = c.course_id
            LEFT JOIN progress p ON l.lesson_id = p.lesson_id AND p.user_id = $1
            WHERE c.program_id = $2
            ORDER BY c.course_id ASC, l.order_index ASC
        `, [userId, programId]);

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching progress by user and program:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE progress
export const createProgress = async (req, res) => {
    const { user_id, lesson_id, completed } = req.body;
    if (!user_id || !lesson_id) {
        return res.status(400).json({ error: "user_id and lesson_id are required" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO progress (user_id, lesson_id, completed, updated_at, completed_at)
             VALUES ($1, $2, $3, NOW(), CASE WHEN $3 = true THEN NOW() ELSE NULL END)
             RETURNING *`,
            [user_id, lesson_id, completed || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE progress
export const updateProgress = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const result = await pool.query(
            `UPDATE progress
             SET completed = COALESCE($1, completed),
                 updated_at = NOW(),
                 completed_at = CASE WHEN $1 = true THEN NOW() ELSE completed_at END
             WHERE progress_id = $2 RETURNING *`,
            [completed, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Progress not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE progress
export const deleteProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM progress WHERE progress_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Progress not found" });
        }
        res.json({ message: "Progress deleted successfully" });
    } catch (err) {
        console.error("Error deleting progress:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};