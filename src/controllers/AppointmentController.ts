import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { Controller } from "./Controller";
import { CreateAppointmentsRequestBody } from "../types/types";

//----------------------------------------------------------------------

export class AppointmentController implements Controller {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
       try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);

        const allAppointment = await appointmentRepository.find();
        return res.status(200).json(allAppointment);
       }catch (error){
        res.status(500).json({
            message: "Error while getting appointments",
        });
       }
    }
    async create(
        req: Request<{}, {}, CreateAppointmentsRequestBody>,
     
        res: Response
      ): Promise<void | Response<any>> {
        try {
          const data = req.body;
          const AppointmentRepository = AppDataSource.getRepository(Appointment);
          const newAppointment = await AppointmentRepository.save(data);
          res.status(201).json(newAppointment);
        } catch (error: any) {
          console.error("Error while creating Appointment:", error);
          res.status(500).json({
            message: "Error while creating Appointment",
            error: error.message,
          });
        }
      }
     }


