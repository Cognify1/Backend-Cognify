import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import testerRoutes from "./src/routes/testerRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import programRoutes from "./src/routes/programRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";
import lessonRoutes from "./src/routes/lessonRoutes.js";
import progressRoutes from "./src/routes/progressRoutes.js";
import resourceRoutes from "./src/routes/resourceRoutes.js";
import challengeRoutes from "./src/routes/challengeRoutes.js";
import submissionRoutes from "./src/routes/submissionRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/tester", testerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submissions", submissionRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Cognify backend running on http://localhost:${PORT}`);
});