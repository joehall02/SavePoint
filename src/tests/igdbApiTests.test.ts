// import test, { describe, mock } from "node:test";
// import { mockResultIgdbResponseData, mockSearchIgdbResponseData } from "../tests/mockTestData.js";
// import assert from "node:assert/strict";
// import request from "supertest";
// import app from "../src/app.js";
// import { searchGame } from "../src/apis/igdbApi.js";

// describe("IGDB api tests", () => {
//   test("POST /search returns a max of 6 game results when given a search parameter", async (t) => {
//     // Given
//     const searchParam: string = "Halo 2";
//     const mockExpectedResponse = mockSearchIgdbResponseData;

//     const mockSearchGame = t.mock.method(searchGame, async (searchParam: string) => {
//       return mockExpectedResponse;
//     });

//     // When
//     const res = await request(app).post("/api/games/search").send(searchParam);

//     // Then
//     assert.equal(res.status, 200);
//     assert.deepEqual(res.body, mockExpectedResponse);
    
//     assert.equal(mockSearchGame.mock.callCount(), 1)
//     assert.deepEqual(mockSearchGame.mock.calls[0].arguments, [
//         searchParam
//     ]);
//   });

//   test("POST /result returns x number of games when given a search and limit parameter", async () => {
//     // Given
//     const searchParam: string = "Lego Battles";
//     const searchLimit: number = 2;
//     const mockExpectedResponse = mockResultIgdbResponseData;

//     // When
//     const res = await request(app).post(
//       `/api/games/result/?search=${searchParam}&limit=${searchLimit}`
//     );

//     // Then
//     assert.equal(res.status, 200);
//     assert.deepEqual(res.body, mockExpectedResponse);
//   });
// });
