import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { CreateAppointmentsRequestBody } from "../types/types";
import { Artist } from "../models/Artist";

//----------------------------------------------------------------------

export class AppointmentController {
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const appointmentRepository = AppDataSource.getRepository(Appointment);

      const page = req.query.page ? Number(req.query.page) : null;
      const limit = req.query.limit ? Number(req.query.limit) : null;

      interface filter {
        [key: string]: any;
      }
      const filter: any = {
        select: {
          date: true,
          time: true,
          user_id: true,
          artist_id: true,
        },
          relations: ["artist", "artist.user", "user"]
      };

      if (page && limit) {
        filter.skip = (page - 1) * limit;
      }
      if (limit) {
        filter.take = limit;
      }

      const [allAppointments, count] = await appointmentRepository.findAndCount(
        filter
      );

      const appointmentsWithArtistNames = allAppointments.map(appointment => ({
        ...appointment,
        artist_name: appointment.artist.user.name, // Assuming 'name' is the property for artist's name
        user_name: appointment.user.name,
        user_last_name: appointment.user.last_name,

    }));

      res.status(200).json({
        count,
        limit,
        page,
        results: appointmentsWithArtistNames,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const myAppointments = await appointmentRepository.find({
        where: { user_id: id }, // Filtrar citas por el ID del usuario
        relations: ["artist", "artist.user"], // Cargar las relaciones del artista y del usuario asociado
        select: ["id", "date", "time", "artist"], // Seleccionar solo los campos necesarios
      });

      // Mapear las citas para incluir el nombre del artista
      const appointmentsWithArtistName = myAppointments.map((appointment) => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        artist: {
          id: appointment.artist.id,
          name: appointment.artist.user.name,
        },
      }));

      res.status(200).json(appointmentsWithArtistName);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  // async getByArtist(
  //   req: Request,
  //   res: Response
  // ): Promise<void | Response<any>> {
  //   try {
  //     const id = +req.params.id;
  //     const appointmentRepository = AppDataSource.getRepository(Appointment);
  //     const myAppointments = await appointmentRepository.find({
  //       where: { artist_id: id }, // Filtrar citas por el ID del usuario
  //       relations: ["user"], // Cargar las relaciones del artista y del usuario asociado
  //       select: ["id", "date", "time", "artist_id"], // Seleccionar solo los campos necesarios
  //     });

  //     // Mapear las citas para incluir el nombre del artista
  //     const appointmentsWithArtistName = myAppointments.map((appointment) => ({
  //       id: appointment.id,
  //       date: appointment.date,
  //       time: appointment.time,
  //       artist_id: appointment.artist_id,
  //       user_id: {
  //         id: appointment.user.id,
  //         name: appointment.user.name,
  //         last_name: appointment.user.last_name,
  //         phone_number: appointment.user.phone_number,
  //       },
  //     }));

  //     res.status(200).json(appointmentsWithArtistName);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error while getting appointmentsxd",
  //     });
  //   }
  // }

  async getByArtist(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const myAppointments = await appointmentRepository.find({
        where: { artist_id: id }, // Filtrar citas por el ID del usuario
        relations: ["user"], // Cargar las relaciones del artista y del usuario asociado
        select: ["id", "date", "time", "artist_id"], // Seleccionar solo los campos necesarios
      });

      // Mapear las citas para incluir el nombre del artista
      const appointmentsWithArtistName = myAppointments.map((appointment) => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        artist_id: appointment.artist_id,
        user_id: {
          id: appointment.user.id,
          name: appointment.user.name,
          last_name: appointment.user.last_name,
          phone_number: appointment.user.phone_number,
        },
      }));

      res.status(200).json(appointmentsWithArtistName);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointmentsxd",
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

      // Verificar si el artista con el artist_id proporcionado existe en la base de datos
      const artistRepository = AppDataSource.getRepository(Artist);
      const artist = await artistRepository.findOne({
        where: { id: data.artist_id },
      });
      if (!artist) {
        return res
          .status(400)
          .json({ message: "El artista especificado no existe." });
      }

      const newAppointment = await appointmentRepository.save(data);
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment,
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
