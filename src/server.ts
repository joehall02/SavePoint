import "reflect-metadata"
import { createApp } from "./app.js";
import config from "./config/config.js";
import db from "./db.js";

const app = createApp();

app.listen(config.port, () => {
  console.log(`${config.nodeEnv} server running on port ${config.port}`);
});

// Close database connection when server closes
process.on("SIGINT", () => {
  try {
    console.log("Closing database connection");
    db.close();
  } catch (err) {
    console.error("Error closing database:", err);
  } finally {
    process.exit(0);
  }
});
