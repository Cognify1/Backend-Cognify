import express from "express";

const router = express.Router();

// Simple dummy endpoint
router.get("/", (req, res) => {
    res.json({
        message: "Tester route working 🚀",
        timestamp: new Date(),
    });
});

export default router;