// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config"; // Use this for ES modules

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// --- Middleware ---
app.use(express.json({ limit: "5mb" })); // Allows parsing JSON bodies
app.use(helmet()); // Secure your app by setting various HTTP headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan("tiny")); // Log API requests

// --- Database Connection ---
connectDB();

// --- API Routes ---
// Combine both sets of routes under separate base paths for clarity
app.use("/api/auth", authRoutes); // e.g., /api/auth/signup, /api/auth/login
app.use("/api/stories", storyRoutes); // e.g., /api/stories, /api/stories/:id

// --- Health Check Endpoint ---
app.get("/health", (req, res) => res.json({ ok: true }));

// --- Start the server ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
