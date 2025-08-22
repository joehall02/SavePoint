import { Game } from "../models/game.js";
import db from "../db.js";

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
  const games = db.prepare("SELECT title FROM games").all();

  return games;
};
