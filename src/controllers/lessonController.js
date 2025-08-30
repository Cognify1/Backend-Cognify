import pool from "../config/db.js";

// GET all lessons
export const getLessons = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM lessons ORDER BY order_index ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching lessons:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET lesson by id
export const getLessonById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM lessons WHERE lesson_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching lesson:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE lesson
export const createLesson = async (req, res) => {
    const { course_id, title, content, order_index } = req.body;
    if (!course_id || !title) {
        return res.status(400).json({ error: "course_id and title are required" });
    }
    try {
        const result = await pool.query(
            `INSERT INTO lessons (course_id, title, content, order_index)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [course_id, title, content || null, order_index || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating lesson:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE lesson
export const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { course_id, title, content, order_index } = req.body;

    try {
        const result = await pool.query(
            `UPDATE lessons
             SET course_id = COALESCE($1, course_id),
                 title = COALESCE($2, title),
                 content = COALESCE($3, content),
                 order_index = COALESCE($4, order_index)
             WHERE lesson_id = $5 RETURNING *`,
            [course_id, title, content, order_index, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating lesson:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE lesson
export const deleteLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM lessons WHERE lesson_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json({ message: "Lesson deleted successfully" });
    } catch (err) {
        console.error("Error deleting lesson:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};