import { Game, GameDetails, PartialGame } from "../models/game.js";
import { ExternalGameDetails, IGDBGame } from "../models/igdbGame.js";
import { throwError } from "../middlewares/errorHandler.js";
import { GameServiceProtocol } from "./protocols/gameServiceProtocol.js";
import { IGDBClientProtocol } from "../apis/protocols/IGDBClientProtocol.js";
import { GameRepoProtocol } from "../repositories/protocols/gameRepoProtocol.js";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../di/tokens.js";
import { PlatformApiId, PlatformName } from "../enums.js";

@injectable()
export class GameService implements GameServiceProtocol {
  constructor(@inject(TOKENS.IGDBClient) private igdbClient: IGDBClientProtocol, @inject(TOKENS.GameRepository) private gameRepo: GameRepoProtocol) {}

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
    await this.gameRepo.deleteGame(gameId);
  };

  async searchIgdbGame(searchParam: string, searchLimit: number, platformName: string): Promise<Array<IGDBGame>> {
    if (searchParam === null) {
      throwError("No search term provided", 400);
    }

    if (searchLimit === null) {
      searchLimit = 10;
    }
    
    let igdbPlatformId;

    switch (platformName) {
      case PlatformName.ps1:
        igdbPlatformId = PlatformApiId.ps1;
        break;
      case PlatformName.ps2:
        igdbPlatformId = PlatformApiId.ps2;
        break;
      case PlatformName.ps3:
        igdbPlatformId = PlatformApiId.ps3;
        break;
      case PlatformName.ps4:
        igdbPlatformId = PlatformApiId.ps4;
        break;
      case PlatformName.ps5:
        igdbPlatformId = PlatformApiId.ps5;
        break;
      case PlatformName.psp:
        igdbPlatformId = PlatformApiId.psp;
        break;
      case PlatformName.ps_vita:
        igdbPlatformId = PlatformApiId.ps_vita;
        break;
      case PlatformName.original_xbox:
        igdbPlatformId = PlatformApiId.original_xbox;
        break;
      case PlatformName.xbox_360:
        igdbPlatformId = PlatformApiId.xbox_360;
        break;
      case PlatformName.xbox_one:
        igdbPlatformId = PlatformApiId.xbox_one;
        break;
      case PlatformName.xbox_series_x_s:
        igdbPlatformId = PlatformApiId.xbox_series_x_s;
        break;
      case PlatformName.sega_mega_drive:
        igdbPlatformId = PlatformApiId.sega_mega_drive;
        break;
      case PlatformName.wii:
        igdbPlatformId = PlatformApiId.wii;
        break;
      case PlatformName.switch:
        igdbPlatformId = PlatformApiId.switch;
        break;
      case PlatformName.nes:
        igdbPlatformId = PlatformApiId.nes;
        break;
      case PlatformName.ds:
        igdbPlatformId = PlatformApiId.ds;
        break;
      case PlatformName.pc:
        igdbPlatformId = PlatformApiId.pc;
        break;
      default:
        igdbPlatformId = null;
    }

    const searchResults = await this.igdbClient.searchGame(searchParam, searchLimit, igdbPlatformId) as Array<IGDBGame>;

    return searchResults;
  };

  async fetchExternalGameDetails(gameId: number): Promise<ExternalGameDetails> {
    if (!gameId) {
      throwError("No game ID provided", 400);
    }

    const externalGameDetails = await this.igdbClient.fetchGameDetails(gameId) as ExternalGameDetails;

    if (!externalGameDetails) {
      throwError("No game found", 404)
    }

    return externalGameDetails
  }
}
