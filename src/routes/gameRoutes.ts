import { Router } from "express";
import { createGame, getGames, editGame, deleteGame } from "../controllers/gameController.js";
import { createGameSchema, editGameSchema } from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// Create a router object
const router = Router();

// Define Routes
router.post("/", validateRequest(createGameSchema), createGame);
router.get("/", getGames);
router.put("/:id", validateRequest(editGameSchema), editGame);
router.delete("/:id", deleteGame);

export default router;
