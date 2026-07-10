import { TOKENS } from "../di/tokens.js";
import { Platform } from "../models/platform.js";
import { PlatformRepoProtocol } from "../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "./protocols/platformServiceProtocol.js";
import { IGDBClientProtocol } from "../apis/protocols/IGDBClientProtocol.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class PlatformService implements PlatformServiceProtocol {
  constructor(
    @inject(TOKENS.PlatformRepository) private platformRepo: PlatformRepoProtocol,
    @inject(TOKENS.IGDBClient) private igdbClient: IGDBClientProtocol,
  ) {}

  async fetchPlatforms(): Promise<Array<Platform>> {
    const platforms = await this.platformRepo.getAllPlatforms();

    const covers = await this.igdbClient.fetchPlatformCovers(platforms.map(p => p.igdbId));
	
    const coverMap = new Map(covers.map(c => [c.id, c.url]));

    return platforms.map(p => ({ ...p, cover: coverMap.get(p.igdbId) }));
  };
}
