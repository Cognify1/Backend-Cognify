import express from "express";
import {
    getLessons,
    getLessonById,
    getLessonsByCourseId,
    createLesson,
    updateLesson,
    deleteLesson
} from "../controllers/lessonController.js";

const router = express.Router();

router.get("/", getLessons);
router.get("/:id", getLessonById);
router.get("/course/:courseId", getLessonsByCourseId);
router.post("/", createLesson);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

export default router;