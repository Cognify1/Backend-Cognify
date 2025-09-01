import express from "express";
import {
    getCourses,
    getCourseById,
    getCoursesByProgramId,
    createCourse,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.get("/program/:programId", getCoursesByProgramId);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;