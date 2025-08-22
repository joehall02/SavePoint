import { Router } from "express";
import { createGame, getGames, editGame, deleteGame } from "../controllers/gameController.js";
import { createGameSchema } from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// Create a router object
const router = Router();

// Define Routes
router.post("/", validateRequest(createGameSchema), createGame);
router.get("/", getGames);

export default router;
