import pool from "../config/db.js";
import vm from "node:vm";

// GET all challenges
export const getChallenges = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM challenges");

        const challenges = result.rows.map(ch => ({
            ...ch,
            test_cases: typeof ch.test_cases === "string"
                ? JSON.parse(ch.test_cases)
                : ch.test_cases
        }));

        res.json(challenges);
    } catch (err) {
        console.error("Error fetching challenges:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET challenge by id
export const getChallengeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM challenges WHERE challenge_id = $1",
            [id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Challenge not found" });

        const challenge = result.rows[0];
        challenge.test_cases = typeof challenge.test_cases === "string"
            ? JSON.parse(challenge.test_cases)
            : challenge.test_cases;

        res.json(challenge);
    } catch (err) {
        console.error("Error fetching challenge:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// CREATE challenge
export const createChallenge = async (req, res) => {
    const { program_id, title, description, difficulty, type, test_cases, hint, solution_url } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO challenges
             (program_id, title, description, difficulty, type, test_cases, hint, solution_url)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                     RETURNING *`,
            [program_id, title, description, difficulty, type, JSON.stringify(test_cases), hint, solution_url]
        );

        const challenge = result.rows[0];
        challenge.test_cases = typeof challenge.test_cases === "string"
            ? JSON.parse(challenge.test_cases)
            : challenge.test_cases;

        res.status(201).json(challenge);
    } catch (err) {
        console.error("Error creating challenge:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UPDATE challenge
export const updateChallenge = async (req, res) => {
    const { id } = req.params;
    const { program_id, title, description, difficulty, type, test_cases, hint, solution_url } = req.body;
    try {
        const result = await pool.query(
            `UPDATE challenges
             SET program_id=$1, title=$2, description=$3, difficulty=$4, type=$5, test_cases=$6, hint=$7, solution_url=$8
             WHERE challenge_id=$9 RETURNING *`,
            [program_id, title, description, difficulty, type, JSON.stringify(test_cases), hint, solution_url, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Challenge not found" });

        const challenge = result.rows[0];
        challenge.test_cases = typeof challenge.test_cases === "string"
            ? JSON.parse(challenge.test_cases)
            : challenge.test_cases;

        res.json(challenge);
    } catch (err) {
        console.error("Error updating challenge:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE challenge
export const deleteChallenge = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM challenges WHERE challenge_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Challenge not found" });

        res.json({ message: "Challenge deleted successfully" });
    } catch (err) {
        console.error("Error deleting challenge:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};