import express from "express";
import {
    getEnrollments,
    getEnrollmentById,
    getEnrollmentsByUserId,
    createEnrollment,
    deleteEnrollment
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.get("/", getEnrollments);
router.get("/user/:userId", getEnrollmentsByUserId);  // New optimized route
router.get("/:id", getEnrollmentById);
router.post("/", createEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;