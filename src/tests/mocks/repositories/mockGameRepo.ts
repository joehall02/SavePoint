import { Game, GameDetails, PartialGame } from "../../../models/game.js";
import { GameRepoProtocol } from "../../../repositories/protocols/gameRepoProtocol.js";

export class MockGameRepo implements GameRepoProtocol {
    async insertGame(game: Game): Promise<void> {}

    async editGame(game: GameDetails, gameId: number): Promise<void> {}

    async getAllGames(): Promise<Array<PartialGame>> {
        
    }

    async getGame(gameId: number): Promise<GameDetails> {
        
    }

    async deleteGame(gameId: number): Promise<void> {}
}