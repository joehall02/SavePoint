import { Request, Response, NextFunction } from "express";
import { getAllGamesSchema, getGameDetailsSchema } from "../schemas/gameSchema.js";
import { addGame, fetchAllGames, fetchGameDetails, updateGame, removeGame, searchIgdbGame } from "../services/gameService.js";

// Add a game to the collection
export const createGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get attributes from request body
    const { title, condition, notes, boxIncluded, rating, igdbId, platformId } = req.body;

    // addGame service to hand business logic
    const newGame = addGame(title, condition, notes, boxIncluded, rating, igdbId, platformId);

    // Return response with 201 and new game
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// Get games from collection
export const getAllGames = (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetchGames service to handle business logic
    const games = fetchAllGames();

    // Return response 200 with games, validating the data against the schema
    res.status(200).json(getAllGamesSchema.array().parse(games));
  } catch (error) {
    next(error);
  }
};

// Get games from collection
export const getGameDetails = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get game id from the parameters
    const gameId: number = Number(req.params.id);

    // fetchGames service to handle business logic
    const game = fetchGameDetails(gameId);

    // Return response 200 with games, validating the data against the schema
    res.status(200).json(getGameDetailsSchema.parse(game));
  } catch (error) {
    next(error);
  }
};

// Edit game in the collection
export const editGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get game id from the parameters
    const gameId: number = Number(req.params.id);

    // Get attributes from request body
    const { title, condition, notes, boxIncluded, rating, platformId } = req.body;

    // updateGame service to handle business logic
    const updatedGame = updateGame(gameId, title, condition, notes, boxIncluded, rating, platformId);

    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

// Delete a game from the collection
export const deleteGame = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get game id from the parameters
    const gameId: number = Number(req.params.id);

    const response = removeGame(gameId);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Search igdb for game from home page
export const searchGameHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchParam } = req.body
    const searchLimit = 6

    const response = await searchIgdbGame(searchParam, searchLimit);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Search igdb for game results page
export const searchGameResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchParam: string = String(req.query.search);
    const searchLimit: number = Number(req.query.limit);

    const response = await searchIgdbGame(searchParam, searchLimit);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
