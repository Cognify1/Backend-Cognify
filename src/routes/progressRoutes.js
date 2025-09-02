import express from "express";
import {
    getAllProgress,
    getProgressByUser,
    getProgressById,
    getProgressByUserAndProgram,
    createProgress,
    updateProgress,
    deleteProgress
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/", getAllProgress);
router.get("/user/:userId", getProgressByUser);
router.get("/user/:userId/program/:programId", getProgressByUserAndProgram);  // Simple optimized route
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

export default router;