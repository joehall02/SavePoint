import { Router } from "express";
import { GameController } from "../controllers/gameController.js";
import * as Schema from "../schemas/gameSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { IGDBClient } from "../apis/igdbClient.js";
import { GameService } from "../services/gameService.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { container } from "tsyringe";
import { IGDBClientProtocol } from "../apis/protocols/IGDBClientProtocol.js";
import { GameRepoProtocol } from "../repositories/protocols/gameRepoProtocol.js";
import { GameServiceProtocol } from "../services/protocols/gameServiceProtocol.js";

// Create a router object
const router = Router();

// Dependancy injection
container.register<IGDBClientProtocol>("IGDBClientProtocol", {
    useClass: IGDBClient
})

container.register<GameRepoProtocol>("GameRepoProtocol", {
    useClass: GameRepository
})

container.register<GameServiceProtocol>("GameServiceProtocol", {
    useClass: GameService
})

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
