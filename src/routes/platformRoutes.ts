import { Router } from "express";
import { PlatformController } from "../controllers/platformController.js";
import { container } from "tsyringe";

// Create a router object
const router = Router();

// Dependancy injection
const platformController = container.resolve(PlatformController)

// Define Routes
router.get("/", platformController.getPlatforms);

export default router;
