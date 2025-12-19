import { ExternalGameDetails, IGDBGame } from "../../models/igdbGame.js";

export interface IGDBClientProtocol {
    searchGame(searchParam: string, searchLimit: number, igdbPlatformId: number | null): Promise<Array<IGDBGame>>;
    fetchGameDetails(gameId: number): Promise<ExternalGameDetails>
}