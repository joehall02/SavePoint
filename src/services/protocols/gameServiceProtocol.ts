import { Game, GameDetails, PartialGame } from "../../models/game.js";
import { IGDBGame, ExternalGameDetails } from "../../models/igdbGame.js";

export interface GameServiceProtocol {
  addGame(
    title: string,
    condition: string,
    notes: string,
    boxIncluded: boolean,
    rating: number,
    igdbId: number,
    platformId: number
  ): Promise<Game>;
  fetchAllGames(): Promise<Array<PartialGame>>;
  fetchGameDetails(gameId: number): Promise<Game>;
  updateGame(
    gameId: number,
    newTitle: string,
    newCondition: string,
    newNotes: string,
    newBoxIncluded: boolean,
    newRating: number,
    newPlatformId: number
  ): Promise<GameDetails>;
  removeGame(gameId: number): Promise<void>;
  searchIgdbGame(searchParam: string | undefined, searchLimit: number | undefined, platformName: string | undefined): Promise<Array<IGDBGame>>;
  fetchExternalGameDetails(gameId: number | undefined): Promise<ExternalGameDetails>;
}
