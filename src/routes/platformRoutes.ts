import { Router } from "express";
import { PlatformService } from "../services/platformService.js";
import { PlatformController } from "../controllers/platformController.js";
import { PlatformRepository } from "../repositories/platformRepository.js";
import { container } from "tsyringe";
import { PlatformRepoProtocol } from "../repositories/protocols/platformRepoProtocol.js";
import { PlatformServiceProtocol } from "../services/protocols/platformServiceProtocol.js";

// Create a router object
const router = Router();

// Dependancy injection
container.register<PlatformRepoProtocol>("PlatformRepoProtocol", {
    useClass: PlatformRepository
})

container.register<PlatformServiceProtocol>("PlatformServiceProtocol", {
    useClass: PlatformService
})

const platformController = container.resolve(PlatformController)

// Define Routes
router.get("/", platformController.getPlatforms);

export default router;
