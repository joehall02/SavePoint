import { Game, PartialGame, GameDetails } from "../../models/game.js";
import { IGDBCount } from "../../models/igdbGame.js";
import { Pagination } from "../../models/pagination.js";

export interface GameRepoProtocol {
    insertGame(game: Game): Promise<void>;
    editGame(game: GameDetails, gameId: number): Promise<void>;
    getAllGames(title: string | undefined, platformId: number | undefined, pagination: Pagination): Promise<Array<PartialGame & { igdbId: number }>>;
    getGame(gameId: number): Promise<GameDetails | undefined>;
    deleteGame(gameId: number): Promise<void>;
    countAllGames(title: string | undefined, platformId: number | undefined): Promise<IGDBCount>;
    searchGamesByTitle(search: string, pagination: Pagination): Promise<Array<PartialGame>>;
}