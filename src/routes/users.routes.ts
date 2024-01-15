// import express from "express";
// import { UserController } from "../controllers/UserController";
// import { sampleMiddleware } from "../middlewares/sampleMiddleware";

// const router = express.Router();
// const userController = new UserController();

// router.post("/newUser", userController.create);
// router.get("/users", userController.getAll);
// router.get("/:id", userController.getById);
// router.patch("/:id", userController.update);

// export default router;

import express from "express";
import { UserController } from "../controllers/UserController";
import { sampleMiddleware } from "../middlewares/sampleMiddleware";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);
router.get("/login", userController.login);
router.get("/:id", userController.getProfile);
router.patch("/:id", userController.update);
router.get("/artists/list", userController.getAllArtists);


// router.get("/users", userController.getAll);
// router.get("/:id", userController.getById);
// router.patch("/:id", userController.update);

export default router;