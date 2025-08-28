import { Game } from "../models/game.js";
import db from "../db.js";
import { AppError } from "../middlewares/errorHandler.js";

export const addGame = (title: string, condition: string, notes: string, boxIncluded: boolean, rating: number, igdbId: number, platformId: number) => {
  // Create a new game object
  const newGame: Game = { title, condition, notes, boxIncluded, rating, igdbId, platformId };

  // Insert game attributes into a new row in the games table in the database
  const query = db.prepare(`
        INSERT INTO games (title, condition, notes, box_included, rating, igdb_id, platform_id) 
        VALUES (@title, @condition, @notes, @boxIncluded, @rating, @igdbId, @platformId )
  `);

  query.run({
    title: newGame.title,
    condition: newGame.condition,
    notes: newGame.notes,
    boxIncluded: newGame.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
    rating: newGame.rating,
    igdbId: newGame.igdbId,
    platformId: newGame.platformId,
  });

  return newGame;
};

export const fetchGames = () => {
  // Select all game titles from games table in the database
  const games = db.prepare("SELECT id, title FROM games").all();

  return games;
};

export const updateGame = (gameId: number, newTitle: string, newCondition: string, newNotes: string, newBoxIncluded: boolean, newRating: number, newPlatformId: number) => {
  // Selects game with the same id from the game table and asserts its type as Game
  const getGamequery = db.prepare(`
    SELECT 
      id,
      title,
      condition,
      notes,
      box_included AS boxIncluded,
      rating,
      igdb_id AS igdbId,
      platform_id AS platformId 
    FROM games
    WHERE id = ?
  `);

  const game = getGamequery.get(gameId) as Game;

  // Check to make sure the game is in the database, if not throw an error
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
    boxIncluded?: boolean;
    rating?: number;
    platformId?: number;
  };

  // Declares updates as type updateGameInput and assigns it the values passed into the function
  const updates: updateGameInput = { title: newTitle, condition: newCondition, notes: newNotes, boxIncluded: newBoxIncluded, rating: newRating, platformId: newPlatformId };

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
        box_included = @boxIncluded,
        rating = @rating,
        platform_id = @platformId
    WHERE id = @id
  `);

  // Runs the query, passing in updatedGame and gameId
  query.run({
    id: gameId,
    title: updatedGame.title,
    condition: updatedGame.condition,
    notes: updatedGame.notes,
    boxIncluded: updatedGame.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
    rating: updatedGame.rating,
    platformId: updatedGame.platformId,
  });

  return updatedGame;
};

export const removeGame = (gameId: number) => {
  const query = db.prepare(`
    DELETE FROM games
    WHERE id = @id  
  `);

  const result = query.run({ id: gameId });

  // Check if the game with the provided id was deleted from the database, if not then throw an error
  if (result.changes === 0) {
    const err: AppError = new Error("Game not found");
    err.status = 404;
    throw err;
  }

  return { message: "Game deleted successfully" };
};
