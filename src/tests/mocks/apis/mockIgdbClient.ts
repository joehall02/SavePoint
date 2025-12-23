import {IGDBClientProtocol} from '../../../apis/protocols/IGDBClientProtocol.js'
import { ExternalGameDetails, IGDBGame, RawExternalGameDetails} from '../../../models/igdbGame.js'
import { mockSearchIgdbResponseData, mockExternalGameDetails } from '../data/game/mockApiData.js'
import { mapExternalGameDetails, mapExternalGame } from '../../../utils.js'
import { throwError } from '../../../middlewares/errorHandler.js'
import { Pagination } from '../../../models/pagination.js'

export class MockIGDBClient implements IGDBClientProtocol {
    async searchGame(searchParam: string, igdbPlatformId: number | undefined, pagination: Pagination): Promise<Array<IGDBGame>> {
        if (searchParam === 'unauthorized') throwError("Request failed with status code 401", 401) // Simulating no tokens being passed and how service reacts
        
        const rawResults = mockSearchIgdbResponseData.slice(0, pagination.limit);

        return mapExternalGame(rawResults as object[]);
    }
    
    async fetchGameDetails(gameId: number): Promise<ExternalGameDetails> {
        if (gameId === 2) throwError("Request failed with status code 401", 401) // Simulating no tokens being passed and how service reacts
        
        const rawDetailsList = mockExternalGameDetails as RawExternalGameDetails[];

        return mapExternalGameDetails(rawDetailsList);
    }
}
