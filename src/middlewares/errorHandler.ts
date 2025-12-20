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

export const throwError = (errorMessage: string, errorCode: number): never => { // never shows callers that it doesn't return
  const err: AppError = new Error(errorMessage);
  err.status = errorCode;
  throw err
};

// Asserts that the value passed in is not undefined and IS generic type T
// if it is undefined then it throws
export function assertExists<T>(value: T | undefined, errorMessage: string): asserts value is T {
  if (value === undefined) {
    throwError(errorMessage, 404);
  }
}
