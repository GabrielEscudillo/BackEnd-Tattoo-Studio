import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { isArtist } from "../middlewares/isArtist";

const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/get", auth, isArtist, appointmentController.getAll)
router.post("/newAppointment", auth, appointmentController.create)
router.get("/mysessions/:id", auth, appointmentController.getById)
router.get("/myappointments/:id",auth, isArtist, appointmentController.getByArtist)
router.patch("/:id", auth, appointmentController.updateAppointment);
router.delete("/:id", auth, isArtist, appointmentController.deleteAppointment);

export default router;


