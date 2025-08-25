import express from "express";
import { getPrograms } from "../controllers/programController.js";

const router = express.Router();

// GET /api/programs
router.get("/", getPrograms);

export default router;
