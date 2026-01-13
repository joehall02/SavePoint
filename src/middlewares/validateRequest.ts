import { Request, Response, NextFunction } from "express";
import z, { ZodError, ZodObject } from "zod";
import config from "../config/config.js";

// Middleware to validate request data against a schema passed into the function
export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // throws error if data is invalid
      next();
    } catch (err: unknown) {
      if (config.nodeEnv === "development") {
        if (err instanceof ZodError) {
          console.error(z.prettifyError(err)); // Log nicely formatted error
        }
      }
      return res.status(400).json({ error: "Validation Error" }); // Return error
    }
  };
};
