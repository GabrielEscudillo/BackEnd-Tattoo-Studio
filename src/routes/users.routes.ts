import express from "express";
import { UserController } from "../controllers/UserController";
import { sampleMiddleware } from "../middlewares/sampleMiddleware";

const router = express.Router();
const userController = new UserController();

router.post("/newUser", userController.create);
router.get("/users", userController.getAll);
router.get("/:id", userController.getById);
router.patch("/:id", userController.update);

export default router;