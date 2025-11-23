import { Router } from "express";
import { PlatformService } from "../services/platformService.js";
import { PlatformController } from "../controllers/platformController.js";

// Create a router object
const router = Router();

// Dependancy injection
const platformService = new PlatformService()
const platformController = new PlatformController(platformService)

// Define Routes
router.get("/", platformController.getPlatforms);

export default router;
