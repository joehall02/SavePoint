import { Request, Response, NextFunction } from "express";
import { Game } from "../models/game";
import { getAllGamesSchema } from "../schemas/gameSchema";
import db from "../db";

// Add a game to the collection
export const createGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get attributes from request body
    const { title, condition, notes, rating, igdb_id, console_id } = req.body;

    // Create a new game object
    const newGame: Game = { title, condition, notes, rating, igdb_id, console_id };

    // Insert game attributes into a new row in the games table in the database
    const query = db.prepare(`
      INSERT INTO games (title, condition, notes, rating, igdb_id, console_id) 
      VALUES (@title, @condition, @notes, @rating, @igdb_id, @console_id )
    `);

    query.run({
      title: newGame.title,
      condition: newGame.condition,
      notes: newGame.notes,
      rating: newGame.rating,
      igdb_id: newGame.igdb_id,
      console_id: newGame.console_id,
    });

    // Return response with 201 and new game
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// Get games from collection
export const getGames = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Select all game titles from games table in the database
    const games = db.prepare("SELECT title FROM games").all();

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
