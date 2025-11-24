import { Platform } from "../../models/platform.js";

export interface PlatformRepoProtocol {
    getAllPlatforms(): Promise<Array<Platform>>    
}