import dotenv from "dotenv";

// Load .env file
dotenv.config();

const env = process.env.NODE_ENV || "development";

dotenv.config({ quiet: true, override: true, path: `.env.${env}` });

// Application configuration options
interface Config {
  port: number; // Port the server listens on
  nodeEnv: string; // Environment name (development, production, testing)
  databaseUri: string; // Database URI
}

const config: Config = {
  port: Number(process.env.PORT) || 5000, // Sets the 5000 if no port available
  nodeEnv: process.env.NODE_ENV || "development", // Sets to 'development' if no port available
  databaseUri: process.env.DATABASE_URI || "app.db", // Sets to app.db if no database uri available
};

export default config;
