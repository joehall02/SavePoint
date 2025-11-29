import { Router } from "express";
import { GameController } from "../controllers/gameController.js";
import * as Schema from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { IGDBClient } from "../apis/igdbClient.js";
import { GameService } from "../services/gameService.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { container } from "tsyringe";

// Create a router object
const router = Router();

// Dependancy injection
container.register("IDGBClient", {
    useClass: IGDBClient
})

container.register("GameRepository", {
    useClass: GameRepository
})

container.register("GameService", {
    useClass: GameService
})

// const igdbClient = new IGDBClient()
// const gameRepo = new GameRepository()
// const gameService = new GameService(igdbClient, gameRepo)
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
