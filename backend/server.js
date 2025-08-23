import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config"; 

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(express.json({ limit: "5mb" })); 
app.use(helmet()); 
app.use(cors()); 
app.use(morgan("tiny")); 


connectDB();

app.use("/api/auth", authRoutes); 
app.use("/api/stories", storyRoutes); 


app.get("/", (req, res) => res.send({ ok: true, message: "QuickFind API" }));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
