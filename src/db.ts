import Database from "better-sqlite3";
import config from "./config/config.js";

// Create sqlite database object
const db = new Database(config.databaseUri);

// Execute table create if they don't already exist
db.exec(`
    CREATE TABLE IF NOT EXISTS consoles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        igdb_id INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        condition TEXT NOT NULL,
        notes TEXT NULL,
        rating INT NULL,
        igdb_id INT NOT NULL,
        console_id INT NOT NULL
    );
`);

// Export database object
export default db;
