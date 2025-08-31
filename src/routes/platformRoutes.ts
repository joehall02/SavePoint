import { Router } from "express";
import { getPlatforms } from "../controllers/platformController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

// Create a router object
const router = Router();

// Define Routes
router.get("/", getPlatforms);

export default router;
