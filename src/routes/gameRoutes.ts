import { Router } from "express";
import { GameController } from "../controllers/gameController.js";
import * as Schema from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { container } from "tsyringe";

// Create a router object
const router = Router();

// Dependancy injection
const gameController = container.resolve(GameController)

// Define Routes
router.post("/", validateRequest(Schema.createGameSchema), gameController.createGame);
router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameDetails);
router.put("/:id", validateRequest(Schema.editGameSchema), gameController.editGame);
router.delete("/:id", gameController.deleteGame);
router.post("/search", validateRequest(Schema.searchGameHomeSchema), gameController.searchGameHome);
router.post("/result/", gameController.searchGameResults);

export default router;
