import { Platform } from "../../models/platform.js";

export interface PlatformServiceProtocol {
    fetchPlatforms(): Promise<Array<Platform>>
}