import express from "express";
import userRoutes from "./routes/users.routes"
import appointmentRoutes from "./routes/appointments.routes"

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/get/appointments/", appointmentRoutes);

export default router;