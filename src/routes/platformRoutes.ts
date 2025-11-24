import { Router } from "express";
import { PlatformService } from "../services/platformService.js";
import { PlatformController } from "../controllers/platformController.js";
import { PlatformRepository } from "../repositories/platformRepository.js";

// Create a router object
const router = Router();

// Dependancy injection
const platformRepo = new PlatformRepository()
const platformService = new PlatformService(platformRepo)
const platformController = new PlatformController(platformService)

// Define Routes
router.get("/", platformController.getPlatforms);

export default router;
