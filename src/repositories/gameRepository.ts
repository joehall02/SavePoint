import db from "../db.js";
import { Game, GameDetails, PartialGame } from "../models/game.js";
import { GameRepoProtocol } from "./protocols/gameRepoProtocol.js";
import { throwError } from "../middlewares/errorHandler.js";
import { Pagination } from "../models/pagination.js";

export class GameRepository implements GameRepoProtocol {
 async insertGame(game: Game): Promise<void> {
    // Insert game attributes into a new row in the games table in the database
    const query = db.prepare(`
      INSERT OR IGNORE INTO games (title, condition, notes, box_included, rating, igdb_id, platform_id) 
      VALUES (@title, @condition, @notes, @boxIncluded, @rating, @igdbId, @platformId )
    `);

    const result = query.run({
      title: game.title,
      condition: game.condition,
      notes: game.notes,
      boxIncluded: game.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
      rating: game.rating,
      igdbId: game.igdbId,
      platformId: game.platformId,
    });

    if (result.changes === 0) {
      throwError("Game already added.", 409)
    }
  };

 async editGame(game: GameDetails, gameId: number): Promise<void> {
    // Updates game table and sets columns values where the rows id matches the gameId passed into the function
    const query = db.prepare(`
      UPDATE games
      SET title = @title,
          condition = @condition,
          notes = @notes,
          box_included = @boxIncluded,
          rating = @rating
      WHERE id = @id
    `);

    // Runs the query, passing in updated game and gameId
    query.run({
      id: gameId,
      title: game.title,
      condition: game.condition,
      notes: game.notes,
      boxIncluded: game.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
      rating: game.rating
    });
  };

 async getAllGames(title: string | undefined, platformId: number | undefined, pagination: Pagination): Promise<Array<PartialGame>>{
    let query = `SELECT id, title FROM games`  
    
    const params: Array<number | string> = [];
    const whereClauses: Array<string> = [];

    if (platformId !== undefined) {
      whereClauses.push(`platform_id = ?`);
      params.push(platformId);
    }

    if (title !== undefined) {
      // Fetches games that match the search term, first checks for exact matches
      // then checks for titles like the search term. Then orders matches
      // with the exact results appearing first 
      whereClauses.push(`LOWER(title) = LOWER(?) OR LOWER(title) LIKE LOWER(?)`);

      // Wildcard - used with LIKE operator to get titles that contain the search term
      const titleLike = `%${title}%`;

      params.push(title, titleLike)
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    if (title !== undefined) {
      query += ` 
        ORDER BY
        CASE 
            WHEN LOWER(title) = LOWER(?) THEN 0
            ELSE 1
        END,
        title ASC`;
      params.push(title);
    } else {
      // Order alphabetically by title in ascending order
      query += ` ORDER BY title ASC`;
    }

    query += ` LIMIT ? OFFSET ?`;

    params.push(pagination.limit, pagination.offset);

    // Select all game titles from games table in the database
    const games = db.prepare(query).all(...params) as Array<PartialGame>;

    return games;
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

  /**
   * @deprecated Use getAllGames instead
   */
  async searchGamesByTitle(search: string, pagination: Pagination): Promise<Array<PartialGame>> {
    // Fetches games that match the search term, first checks for exact matches
    // then checks for titles like the search term. Then orders matches
    // with the exact results appearing first 
    const query = db.prepare(`
      SELECT id, title
      FROM games
      WHERE LOWER(title) = LOWER(?)
         OR LOWER(title) LIKE LOWER(?)
      ORDER BY
        CASE
          WHEN LOWER(title) = LOWER(?) THEN 0
          ELSE 1
        END,
        title ASC
      LIMIT ? OFFSET ?
    `);

    // Wildcard - used with LIKE operator to get titles that contain the search term
    const searchLike = `%${search}%`;

    const games = query.all(search, searchLike, search, pagination.limit, pagination.offset) as Array<PartialGame>;

    return games;
  }
}
