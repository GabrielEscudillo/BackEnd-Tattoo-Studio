import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";

// ----
const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/get", appointmentController.getAll)
router.post("/newAppointment", appointmentController.create)
router.get("/mysessions/:id", appointmentController.getById)
router.get("/myappointments/:id", appointmentController.getByArtist)
router.patch("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

export default router;


