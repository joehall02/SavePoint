import db from "../db.js";
import { Platform } from "../models/platform.js";
import { PlatformRepoProtocol } from "./protocols/platformRepoProtocol.js";

export class PlatformRepository implements PlatformRepoProtocol {
  async getAllPlatforms(): Promise<Array<Platform>> {
    // Select all platform titles from platforms table in the database
    const platforms = db.prepare("SELECT id, title, cover FROM platforms").all();
  
    return platforms as Array<Platform>;
  }
};
