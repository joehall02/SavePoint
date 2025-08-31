import test, { describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

describe("platforms test", () => {
  test("GET /platforms/ should get all platforms", async () => {
    const platform = { title: "PS1" };

    const res = await request(app).get("/api/platforms/");

    assert.equal(res.status, 200);
    assert.equal(res.body[0].title, platform.title);
  });
});
