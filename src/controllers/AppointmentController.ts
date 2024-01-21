import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { CreateAppointmentsRequestBody } from "../types/types";
import { Artist } from "../models/Artist";

//----------------------------------------------------------------------

export class AppointmentController {
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const AppointmentRepository = AppDataSource.getRepository(Appointment);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allAppointments, count] = await AppointmentRepository.findAndCount(
        {
          skip: (currentPage - 1) * itemsPerPage,
          take: itemsPerPage,
          select: {
            id: true,
            user_id: true,
            artist_id: true,
            date: true,
            time: true,
          },
        }
      );
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allAppointments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }
  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
        user_id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getByArtist(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
        artist_id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
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
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const newAppointment = await appointmentRepository.save(data);
      res.status(201).json({
        message: "Appointment created successfully",
      });
    } catch (error: any) {
      console.error("Error while creating Appointment:", error);
      res.status(500).json({
        message: "Error while creating Appointment",
        error: error.message,
      });
    }
  }
  async updateAppointment(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.update({ id: id }, data);

      res.status(202).json({
        message: "Appointment updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating appointment",
      });
    }
  }
  async deleteAppointment(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.delete(id);

      res.status(200).json({
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting appointment",
      });
    }
  }
}
