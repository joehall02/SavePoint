import { Request, Response, NextFunction } from "express";
import { getAllPlatformsSchema } from "../schemas/platformSchema.js";
import { fetchPlatforms } from "../services/platformService.js";

// Get platforms from collection
export const getPlatforms = (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetchPlatforms service to handle business logic
    const platforms = fetchPlatforms();

    // Return response 200 with platforms, validating the data against the schema
    res.status(200).json(getAllPlatformsSchema.array().parse(platforms));
  } catch (error) {
    next(error);
  }
};
