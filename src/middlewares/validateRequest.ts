import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

// Middleware to validate request data against a schema passed into the function
export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // throws error if data is invalid
      next();
    } catch (err: any) {
      return res.status(400).json({ error: "Validation Error" }); // Return error
    }
  };
};
