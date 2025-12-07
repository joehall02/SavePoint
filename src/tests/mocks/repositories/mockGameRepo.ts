import { Game, GameDetails, PartialGame } from "../../../models/game.js";
import { GameRepoProtocol } from "../../../repositories/protocols/gameRepoProtocol.js";
import * as mockData from "../data/game/mockGameRepoData.js";

export class MockGameRepo implements GameRepoProtocol {
    async insertGame(game: Game): Promise<void> {}

    async editGame(game: GameDetails, gameId: number): Promise<void> {}

    async getAllGames(): Promise<Array<PartialGame>> {
        return mockData.mockGetAllGamesData as Array<PartialGame>
    }

    async getGame(gameId: number): Promise<GameDetails> {
        return mockData.mockGetGameData as GameDetails
    }

    async deleteGame(gameId: number): Promise<void> {}
}