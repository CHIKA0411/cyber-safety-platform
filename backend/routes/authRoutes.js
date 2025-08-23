// routes/authRoutes.js

import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// The base path /api/auth is defined in server.js
router.post("/signup", signup);
router.post("/login", login);

export default router;
