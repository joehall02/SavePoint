import { Router } from "express";
import { PlatformController } from "../controllers/platformController.js";

export function PlatformRouter(platformController: PlatformController): Router {
  // Create a router object
  const router = Router();

  // Define Routes
  router.get("/", platformController.getPlatforms);

  return router;
}
