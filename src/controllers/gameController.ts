import { Request, Response, NextFunction } from "express";
import { games, Game } from "../models/game";

// Add a game to the collection
export const createGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get attributes from request body
    const { title, condition, notes, rating, igdb_id, console_id } = req.body;

    // Create a new game
    const newGame: Game = { id: Date.now(), title, condition, notes, rating, igdb_id, console_id };

    // Push game to games array (Replace with database)
    games.push(newGame);

    // Return response with 201 and new game
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// Get games from collection
export const getGames = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

// Edit game in the collection
export const editGame = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

// Delete a game from the collection
export const deleteGame = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};
