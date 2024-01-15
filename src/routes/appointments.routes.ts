import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";

// ----
const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/get", appointmentController.getAll)
router.post("/newAppointment", appointmentController.create)
router.get("/:id", appointmentController.getById)
router.patch("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

export default router;


