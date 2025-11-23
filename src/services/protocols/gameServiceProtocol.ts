import { Game, PartialGame } from "../../models/game.js";
import { IGDBGame } from "../../models/igdbGame.js";

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
  ): Promise<Game>;
  removeGame(gameId: number): Promise<void>;
  searchIgdbGame(searchParam: string, searchLimit: number): Promise<Array<IGDBGame>>;
}
