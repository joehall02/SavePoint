import { Router } from "express";
import { createGame, getAllGames, getGameDetails, editGame, deleteGame, searchGameHome, searchGameResults } from "../controllers/gameController.js";
import { createGameSchema, editGameSchema, searchGameHomeSchema } from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// Create a router object
const router = Router();

// Define Routes
router.post("/", validateRequest(createGameSchema), createGame);
router.get("/", getAllGames);
router.get("/:id", getGameDetails);
router.put("/:id", validateRequest(editGameSchema), editGame);
router.delete("/:id", deleteGame);
router.post("/search", validateRequest(searchGameHomeSchema), searchGameHome);
router.post("/result/", searchGameResults);

export default router;
