import { chatWithOpenAI } from "../controllers/chatController.js";
import express from "express";

const router = express.Router();


router.post("/", chatWithOpenAI);

export default router;
