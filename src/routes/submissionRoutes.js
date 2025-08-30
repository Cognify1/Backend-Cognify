import { Router } from "express";
import {
    createSubmission,
    getSubmissionByChallenge,
    getSubmissionsByUser
} from "../controllers/submissionController.js";

const router = Router();

router.post("/:challengeId", createSubmission);
router.get("/:challengeId", getSubmissionByChallenge);
router.get("/user/:userId", getSubmissionsByUser);

export default router;