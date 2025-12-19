import { ExternalGameDetails, IGDBGame } from "../../models/igdbGame.js";

export interface IGDBClientProtocol {
    searchGame(searchParam: string, searchLimit: number, igdbPlatformId: number): Promise<Array<IGDBGame>>;
    fetchGameDetails(gameId: number): Promise<ExternalGameDetails>
}