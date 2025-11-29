import { Request, Response, NextFunction } from "express";
import { PlatformServiceProtocol } from "../services/protocols/platformServiceProtocol.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class PlatformController {
  constructor(@inject("PlatformServiceProtocol") private service: PlatformServiceProtocol) {}

  public getPlatforms = async(req: Request, res: Response, next: NextFunction) => {
    try {
      // fetchPlatforms service to handle business logic
      const platforms = await this.service.fetchPlatforms();
    
      // Return response 200 with platforms, validating the data against the schema
      res.status(200).json(platforms);
    } catch (error) {
      next(error);
    }
  }
}
