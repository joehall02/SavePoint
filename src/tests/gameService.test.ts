import "reflect-metadata";
import test, { beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createContainer } from "../di/bootstrap.js";
import { createApp } from "../app.js";
import { Express } from "express";
import config from "../config/config.js";
import * as mockData from "./mocks/data/game/mockGameServiceData.js";

describe("games test", () => {
  let app: Express;

  beforeEach(async () => {
    // Create test dependency container
    createContainer(config.nodeEnv);

    // Create app
    app = createApp();
  });

  test("POST /games should create a new game", async () => {
    // Given
    const newGame = mockData.mockNewGameData;

    // When
    const res = await request(app).post("/api/games/").send(newGame);

    // Then
    assert.equal(res.status, 201);
    assert.deepEqual(res.body, newGame);
  });

  test("GET /games/ should get all games", async () => {
    // Given
    const games = mockData.mockGetAllGamesData;

    // When
    const res = await request(app).get("/api/games/");

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, games);
  });

  test("GET /games:id should get a game", async () => {
    // Given
    const game = mockData.mockGetGameByIdData;

    // When
    const res = await request(app).get("/api/games/1");

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, game);
  });

  test("PUT /games/:id should edit a game", async () => {
    // Given
    const updatedGame = mockData.mockEditGameData;

    // When
    const res = await request(app).put("/api/games/1").send(updatedGame);

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, updatedGame);
  });

  test("DELETE /games/:id should delete a game", async () => {
    // When
    const res = await request(app).delete("/api/games/1");

    // Then
    assert.equal(res.status, 200);
  });

  test("POST /search returns a max of 6 game results when given a search parameter", async () => {
    // Given
    const searchParam = mockData.mockSearchParam;
    const response = mockData.mockSearchIgdbData

    // When
    const res = await request(app).post("/api/games/search").send(searchParam);

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, response.slice(0, 6)); // Slice mock data to 6 to match search limit
  });

  test("POST /result returns x number of games when given a search and limit parameter", async () => {
    // Given
    const searchParam = mockData.mockSearchParam;
    const searchLimit: number = 10;
    const response = mockData.mockSearchIgdbData;

    // When
    const res = await request(app).post(
      `/api/games/result/?search=${searchParam}&limit=${searchLimit}`
    );

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, response.slice(0, searchLimit));
  });
});
