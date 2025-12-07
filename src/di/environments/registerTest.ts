import { container } from "tsyringe";
import { GameService } from "../../services/gameService.js";
import { IGDBClientProtocol } from "../../apis/protocols/IGDBClientProtocol.js";
import { GameRepoProtocol } from "../../repositories/protocols/gameRepoProtocol.js";
import { GameServiceProtocol } from "../../services/protocols/gameServiceProtocol.js";
import { PlatformService } from "../../services/platformService.js";
import { PlatformRepoProtocol } from "../../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "../../services/protocols/platformServiceProtocol.js";
import { TOKENS } from "../tokens.js";
import { MockIGDBClient } from "../../tests/mocks/apis/mockIgdbClient.js";

export function registerTest() {
  container.register<IGDBClientProtocol>(TOKENS.IGDBClient, {
    useClass: MockIGDBClient
  });

  container.register<GameRepoProtocol>(TOKENS.GameRepository, {
    useClass: 
  });

  container.register<GameServiceProtocol>(TOKENS.GameService, {
    useClass: GameService
  });

  container.register<PlatformRepoProtocol>(TOKENS.PlatformRepository, {
      useClass: 
  })
  
  container.register<PlatformServiceProtocol>(TOKENS.PlatformService, {
      useClass: PlatformService
  })
}
