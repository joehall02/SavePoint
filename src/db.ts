import Database from "better-sqlite3";
import config from "./config/config.js";

// Create sqlite database object
const db = new Database(config.databaseUri);

// Execute table create if they don't already exist
db.exec(`
    CREATE TABLE IF NOT EXISTS platform (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cover TEXT NOT NULL
    );

    INSERT INTO platform (name, cover)
    VALUES 
        ('PS1', 'ps1.jpg'),
        ('PS2', 'ps2.jpg'),
        ('PS3', 'ps3.jpg'),
        ('PS4', 'ps4.jpg'),
        ('PS5', 'ps5.jpg'),
        ('PSP', 'psp.jpg'),
        ('PS Vita', 'psVita.jpg'),
        ('Original Xbox', 'originalXbox.jpg'),
        ('Xbox 360', 'xbox360.jpg'),
        ('Xbox One', 'xboxOne.jpg'),
        ('Xbox Series X|S', 'xboxSeries.jpg'),
        ('Sega Mega Drive', 'segaMegaDrive.jpg'),
        ('WII', 'wii.jpg'),
        ('Switch', 'switch.jpg'),
        ('NES', 'nes.jpg'),
        ('DS', 'ds.jpg'),
        ('PC', 'pc.jpg');

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        condition TEXT NOT NULL,
        notes TEXT NULL,
        rating INT NULL,
        box_included BOOLEAN NOT NULL,
        igdb_id INT NOT NULL,
        platform_id INT NOT NULL
    );
`);

// Export database object
export default db;
