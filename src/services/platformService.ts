import { getAllPlatforms } from "../repositories/platformRepository.js";

export const fetchPlatforms = () => {
  // Fetch all platforms from the database
  const platforms = getAllPlatforms();

  return platforms;
};
