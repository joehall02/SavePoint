import { Platform } from "../../../models/platform.js";
import { PlatformRepoProtocol } from "../../../repositories/protocols/platformRepoProtocol.js";
import * as mockData from "../data/platform/mockPlatformRepoData.js"

export class MockPlatformRepo implements PlatformRepoProtocol {
    async getAllPlatforms(): Promise<Array<Platform>> {
        return mockData.mockGetAllPlatforms as Array<Platform>
    }
}