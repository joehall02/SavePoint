import db from "../db.js";
import { Game, GameDetails, PartialGame } from "../models/game.js";
import { GameRepoProtocol } from "./protocols/gameRepoProtocol.js";
import { throwError } from "../middlewares/errorHandler.js";

export class GameRepository implements GameRepoProtocol {
 async insertGame(game: Game): Promise<void> {
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

 async editGame(game: GameDetails, gameId: number): Promise<void> {
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

 async getAllGames(): Promise<Array<PartialGame>>{
    // Select all game titles from games table in the database
    const games = db.prepare("SELECT id, title FROM games").all();

    return games as Array<PartialGame>;
  };

 async getGame(gameId: number): Promise<GameDetails | undefined> {
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

    const gameDetails = getGamequery.get(gameId) as GameDetails | undefined;

    return gameDetails;
  };

 async deleteGame(gameId: number): Promise<void> {
    const query = db.prepare(`
          DELETE FROM games
          WHERE id = @id  
      `);

    const result = query.run({ id: gameId });

    // Check if the game with the provided id was deleted from the database, if not then throw an error
    if (result.changes === 0) {
      throwError("Game not found", 404);
    }
  }
}