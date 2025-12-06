import express, { NextFunction, Request, Response } from "express";
import { GameRouter } from "./routes/gameRoutes.js";
import { PlatformRouter } from "./routes/platformRoutes.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import config from "./config/config.js";
import { createContainer } from "./di/bootstrap.js";
import { container } from "tsyringe";
import { GameController } from "./controllers/gameController.js";
import { PlatformController } from "./controllers/platformController.js";

// Create an express app instance
const app = express();

// Dependency Injection
if (config.nodeEnv === "development" || config.nodeEnv === "production") {
  createContainer(config.nodeEnv);
}

const gameController = container.resolve(GameController)
const platformController = container.resolve(PlatformController)

// Middleware
app.use(express.json()); // Parse incoming JSON request bodies
app.use(morgan("combined")); // Log requests

// Routes
app.use("/api/games", GameRouter(gameController));
app.use("/api/platforms", PlatformRouter(platformController));

// 404 Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Requested resource not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
