import { container } from "tsyringe";
import { IGDBClient } from "../../apis/igdbClient.js";
import { GameService } from "../../services/gameService.js";
import { GameRepository } from "../../repositories/gameRepository.js";
import { IGDBClientProtocol } from "../../apis/protocols/IGDBClientProtocol.js";
import { GameRepoProtocol } from "../../repositories/protocols/gameRepoProtocol.js";
import { GameServiceProtocol } from "../../services/protocols/gameServiceProtocol.js";
import { PlatformService } from "../../services/platformService.js";
import { PlatformRepository } from "../../repositories/platformRepository.js";
import { PlatformRepoProtocol } from "../../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "../../services/protocols/platformServiceProtocol.js";
import { TOKENS } from "../tokens.js";

export function registerProd() {
  container.register<IGDBClientProtocol>(TOKENS.IGDBClient, {
    useClass: IGDBClient
  });

  container.register<GameRepoProtocol>(TOKENS.GameRepository, {
    useClass: GameRepository
  });

  container.register<GameServiceProtocol>(TOKENS.GameService, {
    useClass: GameService
  });

  container.register<PlatformRepoProtocol>(TOKENS.PlatformRepository, {
    useClass: PlatformRepository
  });

  container.register<PlatformServiceProtocol>(TOKENS.PlatformService, {
    useClass: PlatformService
  });
}
