import dotenv from "dotenv";

// Load .env file
dotenv.config({ quiet: true });

// Application configuration options
interface Config {
  port: number; // Port the server listens on
  nodeEnv: string; // Environment name (development, production, testing)
}

const config: Config = {
  port: Number(process.env.PORT) || 5000, // Sets the 5000 if no port available
  nodeEnv: process.env.NODE_ENV || "development", // Sets to 'development' if no port available
};

export default config;
