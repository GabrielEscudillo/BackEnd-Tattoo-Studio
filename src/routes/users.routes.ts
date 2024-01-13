import express from "express";
import { UserController } from "../controllers/UserController";
import { sampleMiddleware } from "../middlewares/sampleMiddleware";

const router = express.Router();
const userController = new UserController();

// Rutas de usuario
router.post("/newUser", userController.createUser);
router.get("/users", userController.getAllUsers);
router.post("/newAppointment", userController.createAppointment)

export default router;