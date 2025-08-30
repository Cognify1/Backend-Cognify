import pool from "../config/db.js";

// GET all enrollments
export const getEnrollments = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.enrollment_id,
                   e.user_id,
                   u.email AS user_email,
                   e.program_id,
                   p.title AS program_title,
                   e.enrolled_at
            FROM enrollments e
                     JOIN users u ON e.user_id = u.user_id
                     JOIN programs p ON e.program_id = p.program_id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching enrollments:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
};

// GET enrollment by ID
export const getEnrollmentById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query(`
            SELECT e.enrollment_id,
                   e.user_id,
                   u.email AS user_email,
                   e.program_id,
                   p.title AS program_title,
                   e.enrolled_at
            FROM enrollments e
                     JOIN users u ON e.user_id = u.user_id
                     JOIN programs p ON e.program_id = p.program_id
            WHERE e.enrollment_id = $1
        `, [id]);

        if (result.rows.length === 0) return res.status(404).json({error: "Enrollment not found"});
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching enrollment:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
};

// CREATE enrollment
export const createEnrollment = async (req, res) => {
    const {user_id, program_id} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO enrollments (user_id, program_id) VALUES ($1, $2) RETURNING *",
            [user_id, program_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating enrollment:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
};

// DELETE enrollment
export const deleteEnrollment = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM enrollments WHERE enrollment_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({error: "Enrollment not found"});
        res.json({message: "Enrollment deleted successfully"});
    } catch (err) {
        console.error("Error deleting enrollment:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
};