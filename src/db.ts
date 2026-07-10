import Database from "better-sqlite3";
import config from "./config/config.js";

// Create sqlite database object
const db = new Database(config.databaseUri);

// Execute table create if they don't already exist
// TODO: title may benefit from an index for faster search by title look up
// TODO: Need to fix this creating a new database at the root folder
db.exec(`
    CREATE TABLE IF NOT EXISTS platforms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE,
        igdb_id INTEGER NOT NULL
    );

    INSERT OR IGNORE INTO platforms (id, title, igdb_id)
    VALUES
        (1,  'PS1',             7),
        (2,  'PS2',             8),
        (3,  'PS3',             9),
        (4,  'PS4',             48),
        (5,  'PS5',             167),
        (6,  'PSP',             38),
        (7,  'PS Vita',         46),
        (8,  'Original Xbox',   11),
        (9,  'Xbox 360',        12),
        (10, 'Xbox One',        49),
        (11, 'Xbox Series X|S', 169),
        (12, 'Sega Mega Drive', 29),
        (13, 'WII',             5),
        (14, 'Switch',          130),
        (15, 'NES',             18),
        (16, 'DS',              20),
        (17, 'PC',              6);

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        condition TEXT NOT NULL,
        notes TEXT NULL,
        rating INT NULL,
        box_included BOOLEAN NOT NULL,
        igdb_id INT NOT NULL,
        platform_id INT NOT NULL,
        UNIQUE (igdb_id, platform_id)
    );
`);

// Export database object
export default db;
