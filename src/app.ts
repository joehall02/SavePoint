import express, { NextFunction, Request, Response } from "express";
import gameRoutes from "./routes/gameRoutes.js";
import platformRoutes from "./routes/platformRoutes.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

// Create an express app instance
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON request bodies
app.use(morgan("combined")); // Log requests

// Routes
app.use("/api/games", gameRoutes);
app.use("/api/platforms", platformRoutes);

// 404 Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Requested resource not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
