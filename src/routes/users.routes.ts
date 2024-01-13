import express from "express";
import { UserController } from "../controllers/UserController";
import { sampleMiddleware } from "../middlewares/sampleMiddleware";

//--------------
const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

export default router;