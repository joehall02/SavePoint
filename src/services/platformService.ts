import { Platform } from "../models/platform.js";
import { PlatformRepoProtocol } from "../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "./protocols/platformServiceProtocol.js";

export class PlatformService implements PlatformServiceProtocol {
  constructor(private platformRepo: PlatformRepoProtocol) {}

  async fetchPlatforms(): Promise<Array<Platform>> {
    // Fetch all platforms from the database
    const platforms = this.platformRepo.getAllPlatforms();
    
    return platforms;
  };
}
