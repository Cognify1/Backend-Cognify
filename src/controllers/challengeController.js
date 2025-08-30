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

// SUBMIT solution to challenge
export const submitChallenge = async (req, res) => {
    const { id } = req.params; // challenge_id
    const { user_id, solution_code } = req.body;

    try {
        // Get challenge and its test cases
        const result = await pool.query(
            "SELECT * FROM challenges WHERE challenge_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        const challenge = result.rows[0];
        const testCases = typeof challenge.test_cases === "string"
            ? JSON.parse(challenge.test_cases)
            : challenge.test_cases;

        // Sandbox for running user code
        const sandbox = {};
        vm.createContext(sandbox);

        // Inject user code into the sandbox
        const code = `${solution_code}; result = solve;`;
        try {
            vm.runInContext(code, sandbox, { timeout: 1000 });
        } catch (err) {
            return res.status(400).json({ error: "Code execution error", details: err.message });
        }

        const solve = sandbox.result;
        if (typeof solve !== "function") {
            return res.status(400).json({ error: "You must define a function called solve" });
        }

        // Run test cases
        let allPassed = true;
        let feedback = [];

        for (let tc of testCases) {
            let output;
            let pass = false;

            try {
                output = solve(...tc.input);
                pass = JSON.stringify(output) === JSON.stringify(tc.expected);
                if (!pass) allPassed = false;
            } catch (e) {
                output = String(e);
                allPassed = false;
            }

            feedback.push({
                input: tc.input,
                expected: tc.expected,
                output,
                pass
            });
        }

        // Save submission into DB
        await pool.query(
            "INSERT INTO submissions (challenge_id, user_id, solution_code, passed) VALUES ($1,$2,$3,$4)",
            [id, user_id, solution_code, allPassed]
        );

        // Respond with results
        res.json({
            passed: allPassed,
            results: feedback
        });

    } catch (err) {
        console.error("Error submitting challenge:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};