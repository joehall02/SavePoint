import db from "../db.js";

export const getAllPlatforms = () => {
  // Select all platform titles from platforms table in the database
  const platforms = db.prepare("SELECT id, title, cover FROM platforms").all();

  return platforms;
};
