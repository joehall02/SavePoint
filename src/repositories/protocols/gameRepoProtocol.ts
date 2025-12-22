import { Game, PartialGame, GameDetails } from "../../models/game.js";
import { Pagination } from "../../models/pagination.js";

export interface GameRepoProtocol {
    insertGame(game: Game): Promise<void>;
    editGame(game: GameDetails, gameId: number): Promise<void>;
    getAllGames(platformId: number | undefined, pagination: Pagination): Promise<Array<PartialGame>>;
    getGame(gameId: number): Promise<GameDetails | undefined>;
    deleteGame(gameId: number): Promise<void>;
    searchGamesByTitle(search: string, pagination: Pagination): Promise<Array<PartialGame>>;
}