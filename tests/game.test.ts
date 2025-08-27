import test, { afterEach, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";
import { Game } from "../src/models/game.js";
import db from "../src/db.js";

describe("games test", () => {
  beforeEach(() => {
    // Begin db transaction so the db can rollback after each test
    db.exec("BEGIN TRANSACTION");

    // Create a new game object
    const newGame: Game = { title: "Game1", condition: "Good", notes: "Example", rating: 3, igdb_id: 21, console_id: 1 };

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
  });

  afterEach(() => {
    // Rollback db
    db.exec(`ROLLBACK`);
  });

  test("POST /games should create a new game", async () => {
    const newGame: Game = { title: "Game1", condition: "Good", notes: "Example", rating: 3, igdb_id: 21, console_id: 1 };

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

  test("PUT /games/:id should edit a game", async () => {
    const updatedGame = { id: 1, title: "UpdatedTitle", condition: "Bad", notes: "UpdatedNotes", igdb_id: 21, rating: 2.4, console_id: 5 };

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
