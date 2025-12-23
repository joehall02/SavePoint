import "reflect-metadata";
import test, { beforeEach, describe, mock } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createContainer } from "../di/bootstrap.js";
import { createApp } from "../app.js";
import { Express } from "express";
import config from "../config/config.js";
import * as mockData from "./mocks/data/game/mockGameServiceData.js";

describe("Game Test Suite", () => {
  let app: Express;

  beforeEach(async () => {
    // Create test dependency container
    createContainer(config.nodeEnv);

    // Create app
    app = createApp();
  });

  // TESTS: Create Game
  describe("Create Game Tests", () => {
    test("POST /games should create a new game", async () => {
      // Given
      const newGame = mockData.mockNewGameData;
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 201);
      assert.deepEqual(res.body, newGame);
    });

    test("POST /games should create a new game when not providing notes", async () => {
      // Given
      const newGame = mockData.mockNewGameDataNoNotes;
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 201);
      assert.deepEqual(res.body, newGame);
    });
  
    test("POST /games should create a new game when not providing rating", async () => {
      // Given
      const newGame = mockData.mockNewGameDataNoRating;
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 201);
      assert.deepEqual(res.body, newGame);
    });
 
    test("POST /games should return 409 error if game already exists", async () => {
      // Given
      const newGame = mockData.mockNewGameDataAlreadyExists;
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 409);
    });
  
    test("POST /games should return bad request error when not provided data", async () => {
      // When
      const res = await request(app).post("/api/games/");
  
      // Then
      assert.equal(res.status, 400);
    });
  
    test("POST /games should return bad request error when given incorrect data", async () => {
      // Given
      const newGame = mockData.mockIncorrectGameData;
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 400);
    });

    test("POST /games should return bad request error when given incorrect condition", async () => {
      // Given
      const newGame = mockData.mockNewGameData;
      newGame.condition = "Meh"
  
      // When
      const res = await request(app).post("/api/games/").send(newGame);
  
      // Then
      assert.equal(res.status, 400);
    });
  
    test("POST /games should return bad request error when given partial data", async () => {
      // Given
      const newGame = mockData.mockNewGameData;
      const { condition, ...gameWithoutCondition } = newGame;
  
      // When
      const res = await request(app).post("/api/games/").send(gameWithoutCondition);
  
      // Then
      assert.equal(res.status, 400);
    });
  })

  // TESTS: Get all games
  describe("Get All Games Tests", () => {
    test("GET /games/ should get all games", async () => {
      // Given
      const games = mockData.mockGetAllGamesData;
      
      // When
      const res = await request(app).get("/api/games/");
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, games);
    });

    test("GET /games/ should get all games for a platform when given a platform name", async () => {
      // Given
      const games = mockData.mockGetAllGamesData;
      const platformName = mockData.mockPlatformName

      // When
      const res = await request(app).get(`/api/games?platform=${platformName}`);
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, games);
    });

    test("GET /games/ should get all games when given an incorrect platform name", async () => {
      // Given
      const games = mockData.mockGetAllGamesData;
      const platformName = mockData.mockIncorrectPlatformName

      // When
      const res = await request(app).get(`/api/games?platform=${platformName}`);
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, games);
    });
    
    test("GET /games/ should get games based on pagination parameters", async () => {
      // Given
      const games = mockData.mockGetAllGamesData;
      const platformName = mockData.mockIncorrectPlatformName
      const paginationPage = mockData.paginationPage
      const paginationLimit = mockData.paginationLimit

      // When
      const res = await request(app).get(`/api/games?platform=${platformName}&page=${paginationPage}&limit=${paginationLimit}`);
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, games);
    });
  })

  // TESTS: Game details
  describe("Get Game Details Tests", () => {
    test("GET /games:id should get a game", async () => {
      // Given
      const game = mockData.mockGetGameByIdData;
      
      // When
      const res = await request(app).get("/api/games/1");
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, game);
    });
    
    test("GET /games:id should should return 404 error if game does not exist", async () => {
      // When
      const res = await request(app).get("/api/games/2");
      
      // Then
      assert.equal(res.status, 404);
    });
  })

  // TESTS: Edit game
  describe("Edit Game Tests", () => {
    test("PUT /games/:id should edit a game", async () => {
      // Given
      const updatedGame = mockData.mockEditGameData;

      // When
      const res = await request(app).put("/api/games/1").send(updatedGame);

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, mockData.mockEditGameReturnData);
    });

    test("PUT /games/:id should return 404 error if game doesn't exist", async () => {
      // Given
      const updatedGame = mockData.mockEditGameData;

      // When
      const res = await request(app).put("/api/games/2").send(updatedGame);

      // Then
      assert.equal(res.status, 404);
    });
    
    test("PUT /games/:id should return bad request error if given incorrect data", async () => {
      // Given
      const updatedGame = mockData.mockIncorrectGameData;

      // When
      const res = await request(app).put("/api/games/1").send(updatedGame);

      // Then
      assert.equal(res.status, 400);
    });
   
    test("PUT /games/:id should return bad request error if given incorrect condition", async () => {
      // Given
      const updatedGame = mockData.mockEditGameIncorrectConfitionData;

      // When
      const res = await request(app).put("/api/games/1").send(updatedGame);

      // Then
      assert.equal(res.status, 400);
    });

    test("PUT /games/:id should return bad request error if not given data", async () => {
      // When
      const res = await request(app).put("/api/games/1")

      // Then
      assert.equal(res.status, 400);
    });
  })

  // TESTS: Delete game
  describe("Delete Game Tests", () => {
    test("DELETE /games/:id should delete a game", async () => {
      // When
      const res = await request(app).delete("/api/games/1");

      // Then
      assert.equal(res.status, 200);
    });
    
    test("DELETE /games/:id should return 404 error if the game does not exist", async () => {
      // When
      const res = await request(app).delete("/api/games/2");

      // Then
      assert.equal(res.status, 404);
    });
  })

  // TESTS: Search game by title
  describe("Search Game By Title Tests", () => {
    test("GET /games/search should return games that match the search term", async () => {
      // Given
      const response = mockData.mockGetAllGamesData
      const searchParam = mockData.mockSearchByTitleParam

      // When
      const res = await request(app).get(`/api/games/search?title=${searchParam}`)

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response);
    })
    
    test("GET /games/search should return empty if no games match search term", async () => {
      // Given
      const searchParam = mockData.mockSearchByTitleParamNoMatch
      
      // When
      const res = await request(app).get(`/api/games/search?title=${searchParam}`)
      
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, []);
    })
    
    test("GET /games/search should return games based on pagination parameters", async () => {
      // Given
      const response = mockData.mockGetAllGamesData
      const searchParam = mockData.mockSearchByTitleParam
      const paginationPage = mockData.paginationPage
      const paginationLimit = mockData.paginationLimit
  
      // When
      const res = await request(app).get(`/api/games/search?title=${searchParam}&page=${paginationPage}&limit=${paginationLimit}`)
  
      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response);
    })

    test("GET /games/search should return bad request error when no search term is provided", async () => {
      // When
      const res = await request(app).get(`/api/games/search`)
      
      // Then
      assert.equal(res.status, 400);
    })
    
    test("GET /games/search should return bad request error when search term is empty", async () => {
      // Given
      const searchParam = ""
      
      // When
      const res = await request(app).get(`/api/games/search?title=${searchParam}`)
      
      // Then
      assert.equal(res.status, 400);
    })
  })
  
  // TESTS: API search games
  describe("API Search Game Tests", () => {
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
    
    test("POST /search returns bad request error when search param is not provided", async () => {
      // When
      const res = await request(app).post("/api/games/search");

      // Then
      assert.equal(res.status, 400);
    });

    test("POST /search handles unauthorized error for when token is not provided", async () => {
      // Given
      const searchParam = mockData.mockUnauthorizedSearchParam;
      
      // When
      const res = await request(app).post("/api/games/search").send(searchParam);

      // Then
      assert.equal(res.status, 401);
    });
  })

  // TESTS: API search results
  describe("API Search Results Tests", () => {
    test("POST /result returns x number of games when given a search and limit parameter", async () => {
      // Given
      const searchParam = mockData.mockResultSearchParam;
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
    
    test("POST /result returns x number of games based on pagination parameters", async () => {
      // Given
      const searchParam = mockData.mockResultSearchParam;
      const paginationPage = mockData.paginationPage
      const paginationLimit = mockData.paginationLimit
      const response = mockData.mockSearchIgdbData;

      // When
      const res = await request(app).post(
        `/api/games/result/?search=${searchParam}&page=${paginationPage}&limit=${paginationLimit}`
      );

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response.slice(0, paginationLimit));
    });

    test("POST /result returns x number of games when given a search, limit and platform parameter", async () => {
      // Given
      const searchParam = mockData.mockResultSearchParam;
      const searchLimit: number = 10;
      const platform = mockData.mockPlatformName;
      const response = mockData.mockSearchIgdbData;

      // When
      const res = await request(app).post(
        `/api/games/result/?search=${searchParam}&limit=${searchLimit}&platform=${platform}`
      );

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response.slice(0, searchLimit));
    });

    test("POST /result returns x games from all platforms when not given a correct platform", async () => {
      // Given
      const searchParam = mockData.mockResultSearchParam;
      const searchLimit: number = 10;
      const platform = mockData.mockIncorrectPlatformName;
      const response = mockData.mockSearchIgdbData;

      // When
      const res = await request(app).post(
        `/api/games/result/?search=${searchParam}&limit=${searchLimit}&platform=${platform}`
      );

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response.slice(0, searchLimit));
    });

    test("POST /result handles unauthorized error for when token is not provided", async () => {
      // Given
      const searchParam = mockData.mockUnauthorizedResultsParam;
      const searchLimit: number = 10;

      // When
      const res = await request(app).post(
        `/api/games/result/?search=${searchParam}&limit=${searchLimit}`
      );

      // Then
      assert.equal(res.status, 401);
    });
 
    test("POST /result returns bad request error when search param isn't provided", async () => {
      // When
      const res = await request(app).post(
        `/api/games/result/`
      );

      // Then
      assert.equal(res.status, 400);
    });
  })

  // TESTS: API get game details
  describe("API Fetch Game Details Tests", () => {
    test("POST /game-details returns game details when given a game id", async () => {
      // Given
      const igdbId = 1;
      const response = mockData.mockFetchGameIgdbData
      
      // When
      const res = await request(app).post(
        `/api/games/game-details?gameId=${igdbId}`
      )

      // Then
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, response);
    })
    
    test("POST /game-details return bad request error when not given a game id", async () => {      
      // When
      const res = await request(app).post(
        `/api/games/game-details?`
      )

      // Then
      assert.equal(res.status, 400);
    })

    test("POST /game-details handles unauthorized error for when token is not provided", async () => {
      // Given
      const igdbId = 2;
      
      // When
      const res = await request(app).post(
        `/api/games/game-details?gameId=${igdbId}`
      )

      // Then
      assert.equal(res.status, 401);
    })
  })
});
