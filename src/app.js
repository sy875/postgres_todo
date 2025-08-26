// app.js
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser())
app.use(morgan("dev"));

import healthRoutes from "./routes/health.routes.js"
import todoRoutes from "./routes/todo.routes.js"
import authRoutes from "./routes/auth.routes.js"

import { errorHandler } from "./middlewares/error.middlewares.js";

app.use("/api/v1/health", healthRoutes)
app.use("/api/v1/todo", todoRoutes)
app.use("/api/v1/auth", authRoutes)

app.use(errorHandler)

export default app;
