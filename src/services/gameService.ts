import { Game } from "../models/game.js";
import db from "../db.js";
import { AppError } from "../middlewares/errorHandler.js";

export const addGame = (title: string, condition: string, notes: string, rating: number, igdb_id: number, console_id: number) => {
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

  return newGame;
};

export const fetchGames = () => {
  // Select all game titles from games table in the database
  const games = db.prepare("SELECT id, title FROM games").all();

  return games;
};

export const updateGame = (gameId: number, newTitle: string, newCondition: string, newNotes: string, newRating: number, newConsoleId: number) => {
  // Selects game with the same id from the game table and asserts its type as Game
  const game = db.prepare("SELECT * FROM games WHERE id = ?").get(gameId) as Game;

  if (!game) {
    const err: AppError = new Error("Game not found");
    err.status = 404;
    throw err;
  }

  // Defines a type to allow for optional attributes
  type updateGameInput = {
    title?: string;
    condition?: string;
    notes?: string;
    rating?: number;
    console_id?: number;
  };

  // Declares updates as type updateGameInput and assigns it the values passed into the function
  const updates: updateGameInput = { title: newTitle, condition: newCondition, notes: newNotes, rating: newRating, console_id: newConsoleId };

  // Declares updatedGame with original values from the db
  // and overwrites with updated values if they are not undefined
  const updatedGame = {
    ...game,
    ...Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined)), // Turns updates into an array of key/value pairs, filters out undefined values, then turns back into an object
  };

  // Updates game table and sets columns values where the rows id matches the gameId passed into the function
  const query = db.prepare(`
    UPDATE games
    SET title = @title,
        condition = @condition,
        notes = @notes,
        rating = @rating,
        console_id = @console_id
    WHERE id = @id
  `);

  // Runs the query, passing in updatedGame and gameId
  query.run({
    ...updatedGame,
    id: gameId,
  });

  return updatedGame;
};

export const removeGame = (gameId: number) => {
  const query = db.prepare(`
    DELETE FROM games
    WHERE id = @id  
  `);

  const result = query.run({ id: gameId });

  if (result.changes === 0) {
    const err: AppError = new Error("Game not found");
    err.status = 404;
    throw err;
  }

  return { message: "Game deleted successfully" };
};
