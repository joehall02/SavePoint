import { Platform } from "../models/platform.js";
import { getAllPlatforms } from "../repositories/platformRepository.js";
import { PlatformServiceProtocol } from "./protocols/platformServiceProtocol.js";

export class PlatformService implements PlatformServiceProtocol {
  
  async fetchPlatforms(): Promise<Array<Platform>> {
    // Fetch all platforms from the database
    const platforms = getAllPlatforms() as Array<Platform>;
    
    return platforms;
  };
}
