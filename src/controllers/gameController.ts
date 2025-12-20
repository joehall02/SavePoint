import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { GameServiceProtocol } from "../services/protocols/gameServiceProtocol.js";
import { TOKENS } from "../di/tokens.js";

@injectable()
export class GameController {
  constructor(@inject(TOKENS.GameService) private service: GameServiceProtocol) {}

  public createGame = async(req: Request, res: Response, next: NextFunction) => {
    try {
      // Get attributes from request body
      const { title, condition, notes, boxIncluded, rating, igdbId, platformId } = req.body;

      // addGame service to hand business logic
      const newGame = await this.service.addGame(title, condition, notes, boxIncluded, rating, igdbId, platformId);

      // Return response with 201 and new game
      res.status(201).json(newGame);
    } catch (error) {
      next(error);
    }
  }

  public getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const platformName: string | undefined = req.query.platform as string | undefined;

      // fetchGames service to handle business logic
      const games = await this.service.fetchAllGames(platformName);

      // Return response 200 with games, validating the data against the schema
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
  
  public getGameDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get game id from the parameters
      const gameId: number = Number(req.params.id);

      // fetchGames service to handle business logic
      const game = await this.service.fetchGameDetails(gameId);

      // Return response 200 with games, validating the data against the schema
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }

  public editGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get game id from the parameters
      const gameId: number = Number(req.params.id);
  
      // Get attributes from request body
      const { title, condition, notes, boxIncluded, rating, platformId } = req.body;
  
      // updateGame service to handle business logic
      const updatedGame = await this.service.updateGame(
        gameId,
        title,
        condition,
        notes,
        boxIncluded,
        rating,
        platformId
      );
  
      res.status(200).json(updatedGame);
    } catch (error) {
      next(error);
    }
  };

  public deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get game id from the parameters
      const gameId: number = Number(req.params.id);
  
      const response = await this.service.removeGame(gameId);
  
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // Search game api for search page
  public searchGameHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchParam } = req.body;
      const searchLimit = 6;
      const platformName = undefined;
  
      const response = await this.service.searchIgdbGame(searchParam, searchLimit, platformName);
  
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  
  // Search game api for game results page
  public searchGameResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchParam: string | undefined = req.query.search as string | undefined;
      const searchLimit: number | undefined = req.query.limit ? Number(req.query.limit) : undefined;
      const platformName: string | undefined = req.query.platform as string | undefined;
  
      const response = await this.service.searchIgdbGame(searchParam, searchLimit, platformName);
  
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };

  // Fetch game details from external api
  public fetchExternalGameDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: number | undefined = req.query.gameId ? Number(req.query.gameId) : undefined;

      const response = await this.service.fetchExternalGameDetails(gameId);

      res.status(200).send(response);
    } catch(error) {
      next(error);
    }
  }
}