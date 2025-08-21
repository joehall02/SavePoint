import app from "./app";
import config from "./config/config";
import db from "./db";

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
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
