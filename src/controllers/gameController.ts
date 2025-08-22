import { Request, Response, NextFunction } from "express";
import { getAllGamesSchema } from "../schemas/gameSchema.js";
import { addGame, fetchGames } from "../services/gameService.js";

// Add a game to the collection
export const createGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get attributes from request body
    const { title, condition, notes, rating, igdb_id, console_id } = req.body;

    // addGame service to hand business logic
    const newGame = addGame(title, condition, notes, rating, igdb_id, console_id);

    // Return response with 201 and new game
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// Get games from collection
export const getGames = (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetchGames service to handle business logic
    const games = fetchGames();

    // Return response 200 with games, validating the data against the schema
    res.status(200).json(getAllGamesSchema.array().parse(games));
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
