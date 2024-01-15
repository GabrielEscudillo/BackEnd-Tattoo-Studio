import express from "express";
import userRoutes from "./routes/users.routes"
import appointmentRoutes from "./routes/appointments.routes"
// import authRoutes from "./routes/auth.routes"
// import artistsRoutes from "./routes/artists.routes"
const router = express.Router();

router.use("/api", userRoutes);
router.use("/api/appointments/", appointmentRoutes);
// router.use("/api/auth", authRoutes);
// router.use("/api/artists", artistsRoutes);

export default router;