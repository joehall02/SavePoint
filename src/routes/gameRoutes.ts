import { Router } from "express";
import { createGame, getAllGames, getGameDetails, editGame, deleteGame } from "../controllers/gameController.js";
import { createGameSchema, editGameSchema } from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// Create a router object
const router = Router();

// Define Routes
router.post("/", validateRequest(createGameSchema), createGame);
router.get("/", getAllGames);
router.get("/:id", getGameDetails);
router.put("/:id", validateRequest(editGameSchema), editGame);
router.delete("/:id", deleteGame);

export default router;
