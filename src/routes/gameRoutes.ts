import { Router } from "express";
import { createGame, getGames, editGame, deleteGame } from "../controllers/gameController";
import { createGameSchema } from "../schemas/gameSchema";
import { validateRequest } from "../middlewares/validateRequest";

// Create a router object
const router = Router();

// Define Routes
router.post("/", validateRequest(createGameSchema), createGame);
router.get("/", getGames);

export default router;
