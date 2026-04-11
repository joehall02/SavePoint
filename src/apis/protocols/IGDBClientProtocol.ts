import { ExternalGameDetails, IGDBCount, IGDBGame } from "../../models/igdbGame.js";
import { Pagination } from "../../models/pagination.js";

export interface IGDBClientProtocol {
    searchGame(searchParam: string, igdbPlatformId: number | undefined, pagination: Pagination): Promise<Array<IGDBGame>>;
    countGame(searchParam: string, igdbPlatformId: number | undefined): Promise<IGDBCount>;
    fetchGameDetails(gameId: number): Promise<ExternalGameDetails>
}