import {IGDBClientProtocol} from '../../../apis/protocols/IGDBClientProtocol.js'
import { ExternalGameDetails, IGDBGame } from '../../../models/igdbGame.js'
import { mockSearchIgdbResponseData, mockExternalGameDetails } from '../data/game/mockApiData.js'

export class MockIGDBClient implements IGDBClientProtocol {
    async searchGame(searchParam: string, searchLimit: number): Promise<Array<IGDBGame>> {
        return mockSearchIgdbResponseData.slice(0, searchLimit) as Array<IGDBGame>
    }
    
    async fetchGameDetails(gameId: number): Promise<ExternalGameDetails> {
        return mockExternalGameDetails as ExternalGameDetails
    }
}
