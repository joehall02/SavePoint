import express from "express";
import gameRoutes from "./routes/gameRoutes";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";

// Create an express app instance
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON request bodies
app.use(morgan("combined")); // Log requests

// Routes
app.use("/api/games", gameRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
