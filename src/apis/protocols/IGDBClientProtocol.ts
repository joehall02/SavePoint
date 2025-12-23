import { ExternalGameDetails, IGDBGame } from "../../models/igdbGame.js";
import { Pagination } from "../../models/pagination.js";

export interface IGDBClientProtocol {
    searchGame(searchParam: string, igdbPlatformId: number | undefined, pagination: Pagination): Promise<Array<IGDBGame>>;
    fetchGameDetails(gameId: number): Promise<ExternalGameDetails>
}