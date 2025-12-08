import {IGDBClientProtocol} from '../../../apis/protocols/IGDBClientProtocol.js'
import { ExternalGameDetails, IGDBGame, RawExternalGameDetails} from '../../../models/igdbGame.js'
import { mockSearchIgdbResponseData, mockExternalGameDetails } from '../data/game/mockApiData.js'
import { mapExternalGameDetails, mapExternalGame } from '../../../utils.js'

export class MockIGDBClient implements IGDBClientProtocol {
    async searchGame(searchParam: string, searchLimit: number): Promise<Array<IGDBGame>> {
        const rawResults = mockSearchIgdbResponseData.slice(0, searchLimit);

        return mapExternalGame(rawResults as object[]);
    }
    
    async fetchGameDetails(gameId: number): Promise<ExternalGameDetails> {
        const rawDetailsList = mockExternalGameDetails as RawExternalGameDetails[];

        return mapExternalGameDetails(rawDetailsList);
    }
}
