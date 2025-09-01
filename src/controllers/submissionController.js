import pool from "../config/db.js";
import vm from "node:vm";

// Create a new submission (user submits a solution for a challenge)
export const createSubmission = async (req, res) => {
    const { challengeId } = req.params;
    const { user_id, solution_code } = req.body;

    try {
        // Fetch challenge and its test cases
        const result = await pool.query(
            "SELECT * FROM challenges WHERE challenge_id = $1",
            [challengeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        const challenge = result.rows[0];
        const testCases = typeof challenge.test_cases === "string"
            ? JSON.parse(challenge.test_cases)
            : challenge.test_cases;

        // Create a sandbox for running user code
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

        // Run test cases and collect feedback
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
            [challengeId, user_id, solution_code, allPassed]
        );

        // Respond with results
        res.json({
            passed: allPassed,
            results: feedback
        });

    } catch (err) {
        console.error("Error creating submission:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get the latest submission of a user for a challenge
export const getSubmissionByChallenge = async (req, res) => {
    const { challengeId } = req.params;
    const { user_id } = req.query;

    try {
        const result = await pool.query(
            `SELECT * FROM submissions 
             WHERE challenge_id = $1 AND user_id = $2 
             ORDER BY submitted_at DESC LIMIT 1`,
            [challengeId, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No submission found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching submission:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all submissions of a user
export const getSubmissionsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM submissions WHERE user_id = $1 ORDER BY submitted_at DESC",
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching user submissions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};