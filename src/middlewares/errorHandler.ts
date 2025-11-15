import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export const throwGameNotFoundError = () => {
    const err: AppError = new Error("Game not found");
    err.status = 404;
    throw err;
}