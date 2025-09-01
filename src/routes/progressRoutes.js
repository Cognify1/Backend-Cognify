import express from "express";
import {
    getAllProgress,
    getProgressByUser,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/", getAllProgress);
router.get("/user/:userId", getProgressByUser);
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

export default router;