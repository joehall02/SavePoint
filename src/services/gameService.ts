import { Game } from "../models/game.js";
import { throwError } from "../middlewares/errorHandler.js";
import { insertGame, editGame, getAllGames, getGame, deleteGame } from "../repositories/gameRepository.js";
import { searchGame } from "../apis/igdbApi.js"

export const addGame = (title: string, condition: string, notes: string, boxIncluded: boolean, rating: number, igdbId: number, platformId: number) => {
  // Create a new game object
  const newGame: Game = { title, condition, notes, boxIncluded, rating, igdbId, platformId };

  // Add newGame to the database
  insertGame(newGame);

  return newGame;
};

export const fetchAllGames = () => {
  // Get games from the database
  const games = getAllGames();

  return games;
};

export const fetchGameDetails = (gameId: number) => {
  // Defines a type to allow for optional attributes
  type getGameDetailsType = {
    title: string;
    condition: string;
    notes: string;
    boxIncluded: number;
    rating: number;
    igdbId: number;
    platformId: number;
  };

  // Get game details from the database
  const gameDetails = getGame(gameId) as getGameDetailsType;

  // Check to make sure the game is in the database, if not throw an error
  if (!gameDetails) {
    throwError("Game not found", 404);
  }

  const game: Game = {
    title: gameDetails.title,
    condition: gameDetails.condition,
    notes: gameDetails.notes,
    boxIncluded: gameDetails.boxIncluded === 1 ? true : false,
    rating: gameDetails.rating,
    igdbId: gameDetails.igdbId,
    platformId: gameDetails.platformId,
  };

  return game;
};

export const updateGame = (gameId: number, newTitle: string, newCondition: string, newNotes: string, newBoxIncluded: boolean, newRating: number, newPlatformId: number) => {
  // Get game from the database
  const game = getGame(gameId) as Game;

  // Check to make sure the game is in the database, if not throw an error
  if (!game) {
    throwError("Game not found", 404);
  }

  // Defines a type to allow for optional attributes
  type updateGameInput = {
    title?: string;
    condition?: string;
    notes?: string;
    boxIncluded?: boolean;
    rating?: number;
    platformId?: number;
  };

  // Declares updates as type updateGameInput and assigns it the values passed into the function
  const updates: updateGameInput = { title: newTitle, condition: newCondition, notes: newNotes, boxIncluded: newBoxIncluded, rating: newRating, platformId: newPlatformId };

  // Declares updatedGame with original values from the db
  // and overwrites with updated values if they are not undefined
  const updatedGame: Game = {
    ...game,
    ...Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined)), // Turns updates into an array of key/value pairs, filters out undefined values, then turns back into an object
  };

  // Update game in the database
  editGame(updatedGame, gameId);

  return updatedGame;
};

export const removeGame = (gameId: number) => {
  // Delete game in database
  const result = deleteGame(gameId);

  // Check if the game with the provided id was deleted from the database, if not then throw an error
  if (result.changes === 0) {
    throwError("Game not found", 404);
  }

  return { message: "Game deleted successfully" };
};

export const searchIgdbGame = async (searchParam: string, searchLimit: number) => {
  if (searchParam === null) {
    throwError("No search term provided", 400);
  }

  if (searchLimit === null) {
    searchLimit = 10
  }

  console.log("search params " + searchParam)
  console.log("search limit " + searchLimit)
  // TODO When not working still returns error 200 with {}
  const searchResults = await searchGame(searchParam, searchLimit)

  console.log(searchResults)

  return searchResults
};
