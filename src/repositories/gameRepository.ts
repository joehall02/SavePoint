import db from "../db.js";
import { Game } from "../models/game.js";

export const insertGame = (game: Game) => {
  // Insert game attributes into a new row in the games table in the database
  const query = db.prepare(`
    INSERT INTO games (title, condition, notes, box_included, rating, igdb_id, platform_id) 
    VALUES (@title, @condition, @notes, @boxIncluded, @rating, @igdbId, @platformId )
  `);

  query.run({
    title: game.title,
    condition: game.condition,
    notes: game.notes,
    boxIncluded: game.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
    rating: game.rating,
    igdbId: game.igdbId,
    platformId: game.platformId,
  });
};

export const editGame = (game: Game, gameId: number) => {
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

  // Runs the query, passing in updated game and gameId
  query.run({
    id: gameId,
    title: game.title,
    condition: game.condition,
    notes: game.notes,
    boxIncluded: game.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
    rating: game.rating,
    platformId: game.platformId,
  });
};

export const getAllGames = () => {
  // Select all game titles from games table in the database
  const games = db.prepare("SELECT id, title FROM games").all();

  return games;
};

export const getGame = (gameId: number) => {
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

  const gameDetails = getGamequery.get(gameId);

  return gameDetails;
};

export const deleteGame = (gameId: number) => {
  const query = db.prepare(`
        DELETE FROM games
        WHERE id = @id  
    `);

  const result = query.run({ id: gameId });

  return result;
};
