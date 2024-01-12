import express from "express";
import userRoutes from "./routes/users.routes"

const router = express.Router();

router.use("/api/users", userRoutes);

export default router;