import { Platform } from "../models/platform.js";
import { PlatformRepoProtocol } from "../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "./protocols/platformServiceProtocol.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class PlatformService implements PlatformServiceProtocol {
  constructor(@inject("PlatformRepoProtocol") private platformRepo: PlatformRepoProtocol) {}

  async fetchPlatforms(): Promise<Array<Platform>> {
    // Fetch all platforms from the database
    const platforms = this.platformRepo.getAllPlatforms();
    
    return platforms;
  };
}
