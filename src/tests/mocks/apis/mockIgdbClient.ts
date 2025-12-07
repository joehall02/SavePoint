import {IGDBClientProtocol} from '../../../apis/protocols/IGDBClientProtocol.js'
import { IGDBGame } from '../../../models/igdbGame.js'
import { mockSearchIgdbResponseData } from '../data/game/mockApiData.js'

export class MockIGDBClient implements IGDBClientProtocol {
    async searchGame(searchParam: string, searchLimit: number): Promise<Array<IGDBGame>> {
        return mockSearchIgdbResponseData.slice(0, searchLimit) as Array<IGDBGame>
    }
}
