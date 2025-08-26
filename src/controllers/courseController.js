import pool from "../config/db.js";

// GET all courses
export const getCourses = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM courses");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET course by id
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM courses WHERE course_id = $1",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching course:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE course
export const createCourse = async (req, res) => {
    const { title, description, program_id } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO courses (title, description, program_id) VALUES ($1, $2, $3) RETURNING *",
            [title, description, program_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating course:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE course
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, program_id } = req.body;
    try {
        const result = await pool.query(
            "UPDATE courses SET title = $1, description = $2, program_id = $3 WHERE course_id = $4 RETURNING *",
            [title, description, program_id, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating course:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM courses WHERE course_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Course not found" });
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
