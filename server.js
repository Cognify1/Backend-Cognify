import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./src/routes/userRoutes.js";
import programRoutes from "./src/routes/programRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Cognify backend running on http://localhost:${PORT}`);
});
