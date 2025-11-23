import { Game, GameDetails, PartialGame } from "../models/game.js";
import { IGDBGame } from "../models/igdbGame.js";
import { throwError } from "../middlewares/errorHandler.js";
import { GameServiceProtocol } from "./protocols/gameServiceProtocol.js";
import { IGDBClientProtocol } from "../apis/protocols/IGDBClientProtocol.js";
import { GameRepoProtocol } from "../repositories/protocols/gameRepoProtocol.js";

export class GameService implements GameServiceProtocol {
  constructor(private igdbClient: IGDBClientProtocol, private gameRepo: GameRepoProtocol) {}

  async addGame(
    title: string,
    condition: string,
    notes: string,
    boxIncluded: boolean,
    rating: number,
    igdbId: number,
    platformId: number
  ): Promise<Game> {
    // Create a new game object
    const newGame: Game = { title, condition, notes, boxIncluded, rating, igdbId, platformId };

    // Add newGame to the database
    await this.gameRepo.insertGame(newGame);

    return newGame;
  }

  async fetchAllGames(): Promise<Array<PartialGame>> {
    // Get games from the database
    const games = await this.gameRepo.getAllGames();

    return games;
  }

  async fetchGameDetails(gameId: number): Promise<Game> {
    // Get game details from the database
    const gameDetails = await this.gameRepo.getGame(gameId);

    // Check to make sure the game is in the database, if not throw an error
    if (!gameDetails) {
      throwError("Game not found", 404);
    }

    const game: Game = {
      title: gameDetails.title,
      condition: gameDetails.condition,
      notes: gameDetails.notes,
      boxIncluded: gameDetails.boxIncluded === 1 ? true : false,
      rating: gameDetails.rating,
      igdbId: gameDetails.igdbId,
      platformId: gameDetails.platformId,
    };

    return game;
  };

  async updateGame(
    gameId: number,
    newTitle: string,
    newCondition: string,
    newNotes: string,
    newBoxIncluded: boolean,
    newRating: number,
    newPlatformId: number
  ): Promise<GameDetails>{
    // Get game from the database
    const game = await this.gameRepo.getGame(gameId);

    // Check to make sure the game is in the database, if not throw an error
    if (!game) {
      throwError("Game not found", 404);
    }

    // Defines a type to allow for optional attributes
    type updateGameInput = {
      title?: string;
      condition?: string;
      notes?: string;
      boxIncluded?: boolean;
      rating?: number;
      platformId?: number;
    };

    // Declares updates as type updateGameInput and assigns it the values passed into the function
    const updates: updateGameInput = {
      title: newTitle,
      condition: newCondition,
      notes: newNotes,
      boxIncluded: newBoxIncluded,
      rating: newRating,
      platformId: newPlatformId,
    };

    // Declares updatedGame with original values from the db
    // and overwrites with updated values if they are not undefined
    const updatedGame: GameDetails = {
      ...game,
      ...Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined)), // Turns updates into an array of key/value pairs, filters out undefined values, then turns back into an object
    };

    // Update game in the database
    await this.gameRepo.editGame(updatedGame, gameId);

    return updatedGame;
  };

  async removeGame(gameId: number): Promise<void> {
    // Delete game in database
    const result = await this.gameRepo.deleteGame(gameId);

    // Check if the game with the provided id was deleted from the database, if not then throw an error
    if (result.changes === 0) {
      throwError("Game not found", 404);
    }
  };

  async searchIgdbGame(searchParam: string, searchLimit: number): Promise<Array<IGDBGame>> {
    if (searchParam === null) {
      throwError("No search term provided", 400);
    }

    if (searchLimit === null) {
      searchLimit = 10;
    }

    // TODO When not working still returns error 200 with {}
    const searchResults = await this.igdbClient.searchGame(searchParam, searchLimit) as Array<IGDBGame>;

    return searchResults;
  };
}
