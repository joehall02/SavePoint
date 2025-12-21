import Database from "better-sqlite3";
import config from "./config/config.js";

// Create sqlite database object
const db = new Database(config.databaseUri);

// Execute table create if they don't already exist
db.exec(`
    CREATE TABLE IF NOT EXISTS platforms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE,
        cover TEXT NOT NULL
    );

    INSERT OR IGNORE INTO platforms (id, title, cover)
    VALUES 
        (1, 'PS1', 'ps1.jpg'),
        (2, 'PS2', 'ps2.jpg'),
        (3, 'PS3', 'ps3.jpg'),
        (4, 'PS4', 'ps4.jpg'),
        (5, 'PS5', 'ps5.jpg'),
        (6, 'PSP', 'psp.jpg'),
        (7, 'PS Vita', 'psVita.jpg'),
        (8, 'Original Xbox', 'originalXbox.jpg'),
        (9, 'Xbox 360', 'xbox360.jpg'),
        (10, 'Xbox One', 'xboxOne.jpg'),
        (11, 'Xbox Series X|S', 'xboxSeries.jpg'),
        (12, 'Sega Mega Drive', 'segaMegaDrive.jpg'),
        (13, 'WII', 'wii.jpg'),
        (14, 'Switch', 'switch.jpg'),
        (15, 'NES', 'nes.jpg'),
        (16, 'DS', 'ds.jpg'),
        (17, 'PC', 'pc.jpg');

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
