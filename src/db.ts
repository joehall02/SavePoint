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
        (1,  'PlayStation',                    7),
        (2,  'PlayStation 2',                  8),
        (3,  'PlayStation 3',                  9),
        (4,  'PlayStation 4',                  48),
        (5,  'PlayStation 5',                  167),
        (6,  'PlayStation Portable',           38),
        (7,  'PlayStation Vita',               46),
        (8,  'Xbox',                           11),
        (9,  'Xbox 360',                       12),
        (10, 'Xbox One',                       49),
        (11, 'Xbox Series X|S',               169),
        (12, 'Sega Mega Drive/Genesis',        29),
        (13, 'Wii',                            5),
        (14, 'Nintendo Switch',                130),
        (15, 'Nintendo Entertainment System',  18),
        (16, 'Nintendo DS',                    20),
        (17, 'PC (Microsoft Windows)',          6);

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
