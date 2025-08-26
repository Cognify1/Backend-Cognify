import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import testerRoutes from "./src/routes/testerRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import programRoutes from "./src/routes/programRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/tester", testerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Cognify backend running on http://localhost:${PORT}`);
});
