import { RunResult } from "better-sqlite3";
import { Game, PartialGame, GameDetails } from "../../models/game.js";

export interface GameRepoProtocol {
    insertGame(game: Game): Promise<void>;
    editGame(game: GameDetails, gameId: number): Promise<void>;
    getAllGames(): Promise<Array<PartialGame>>;
    getGame(gameId: number): Promise<GameDetails>;
    deleteGame(gameId: number): Promise<RunResult>;
}