import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";

// ----
const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/appointments", appointmentController.getAll)
router.post("/newAppointment", appointmentController.create)


export default router;


