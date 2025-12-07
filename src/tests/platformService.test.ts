import "reflect-metadata";
import test, { beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import * as mockData from "./mocks/data/platform/mockPlatformRepoData.js";
import { createContainer } from "../di/bootstrap.js";
import config from "../config/config.js";
import { createApp } from "../app.js";
import { Express } from "express";

describe("platforms test", () => {
  let app: Express;

  beforeEach(async () => {
    // Create test dependency container
    createContainer(config.nodeEnv);

    // Create app
    app = createApp();  
  });

  test("GET /platforms/ should get all platforms", async () => {
    // Given
    const platformData = mockData.mockGetAllPlatforms;

    // When
    const res = await request(app).get("/api/platforms/");

    // Then
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, platformData);
  });
});
