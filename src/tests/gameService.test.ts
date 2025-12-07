import test, { afterEach, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";
import { Game } from "../models/game.js";
import db from "../db.js";
import { createContainer } from "../di/bootstrap.js";
import config from "../config/config.js";

describe("games test", () => {
  beforeEach(() => {
    // Begin db transaction so the db can rollback after each test
    db.exec("BEGIN TRANSACTION");
    
    // Create test dependency container
    createContainer(config.nodeEnv);
    
    // Create a new game object
    // const newGame: Game = { title: "Game1", condition: "Good", notes: "Example", boxIncluded: true, rating: 3, igdbId: 21, platformId: 1 };

    // const query = db.prepare(`
    //   INSERT INTO games (title, condition, notes, box_included, rating, igdb_id, platform_id) 
    //   VALUES (@title, @condition, @notes, @boxIncluded, @rating, @igdbId, @platformId )
    // `);

    // query.run({
    //   title: newGame.title,
    //   condition: newGame.condition,
    //   notes: newGame.notes,
    //   boxIncluded: newGame.boxIncluded ? 1 : 0, // Sets box included parameter to either 1 or 0 to be compatible with SQLite
    //   rating: newGame.rating,
    //   igdbId: newGame.igdbId,
    //   platformId: newGame.platformId,
    // });
  });

  // afterEach(() => {
  //   // Rollback db
  //   db.exec(`ROLLBACK`);
  // });

  test("POST /games should create a new game", async () => {
    const newGame: Game = { title: "Game1", condition: "Good", notes: "Example", boxIncluded: true, rating: 3, igdbId: 21, platformId: 1 };

    const res = await request(app).post("/api/games/").send(newGame);

    assert.equal(res.status, 201);
    assert.deepEqual(res.body, newGame);
  });

  test("GET /games/ should get all games", async () => {
    const game = { title: "Game1" };

    const res = await request(app).get("/api/games/");

    assert.equal(res.status, 200);
    assert.equal(res.body[0].title, game.title);
  });

  test("GET /games:id should get a game", async () => {
    const game: Game = { title: "Game1", condition: "Good", notes: "Example", boxIncluded: true, rating: 3, igdbId: 21, platformId: 1 };

    const res = await request(app).get("/api/games/1");

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, game);
  });

  test("PUT /games/:id should edit a game", async () => {
    const updatedGame = { id: 1, title: "UpdatedTitle", condition: "Bad", notes: "UpdatedNotes", boxIncluded: false, rating: 2.4, igdbId: 21, platformId: 5 };

    const res = await request(app).put("/api/games/1").send(updatedGame);

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, updatedGame);
  });

  test("DELETE /games/:id should delete a game", async () => {
    const res = await request(app).delete("/api/games/1");

    assert.equal(res.status, 200);
    assert.equal(res.body.message, "Game deleted successfully");
  });
});
