import express from "express";
import userRoutes from "./routes/users.routes"

const router = express.Router();

router.use("/api", userRoutes);

export default router;