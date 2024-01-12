import express from "express";
import { UserController } from "../controllers/UserController";
import { sampleMiddleware } from "../middlewares/sampleMiddleware";

//--------------
const router = express.Router();
// const UserController = new UserController();

router.get("/", UserController.getAllUsers);

export default router;