import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { Artist } from "../models/Artist";
import { UserRoles } from "../constants/UserRoles";

export class AuthController {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
        try {
           const artistRepository = AppDataSource.getRepository(Artist);
           
           const allArtists = await artistRepository.find();
           res.status(200).json(allArtists);
        } catch (error) {
           res.status(500).json({
              message: "Error while getting users",
           });
        }
     }
     
}
