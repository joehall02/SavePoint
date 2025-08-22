import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";
import { Game } from "../src/models/game.js";

test("POST /games/ should create a new game", async () => {
  const newGame: Game = { title: "Game1", condition: "Good", notes: "Example", rating: 3, igdb_id: 21, console_id: 1 };

  const res = await request(app).post("/api/games/").send(newGame);

  assert.equal(res.status, 201);
  assert.equal(res.body.title, newGame.title);
  assert.equal(res.body.condition, newGame.condition);
  assert.equal(res.body.notes, newGame.notes);
  assert.equal(res.body.rating, newGame.rating);
  assert.equal(res.body.igdb_id, newGame.igdb_id);
  assert.equal(res.body.console_id, newGame.console_id);
});
