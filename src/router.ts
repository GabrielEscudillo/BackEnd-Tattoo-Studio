import express from "express";
import userRoutes from "./routes/users.routes"
import appointmentRoutes from "./routes/appointments.routes"
import authRoutes from "./routes/auth.routes"
const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/get/appointments/", appointmentRoutes);
router.use("/api/auth", authRoutes);

export default router;