// import { Controller } from "./Controller";
// import { Request, Response } from "express";
// import { User } from "../models/User";
// import { AppDataSource } from "../database/data-source";
// import { Artist } from "../models/Artist";
// import { UserRoles } from "../constants/UserRoles";
// import {
//    CreateUserRequestBody,
//    CreateArtistRequestBody,
//    TokenData,
// } from "../types/types";
// import bcrypt from "bcrypt";
// import { StatusCodes } from "http-status-codes";
// import { isAdmin } from "../middlewares/isAdmin";
// import { Role } from "../models/Role";
// import { Admin } from "typeorm";
// // -----------------------------------------------------------------------------

// export class ArtistController implements Controller {
//     async getAll(req: Request, res: Response): Promise<void | Response<any>> {
//        try {
//           const artistRepository = AppDataSource.getRepository(Artist);
          
//           const allArtists = await artistRepository.find();
//           res.status(200).json(allArtists);
//        } catch (error) {
//           res.status(500).json({
//              message: "Error while getting users",
//           });
//        }
//     }
//     async getById(req: Request, res: Response): Promise<void | Response<any>> {
//         try {
//            const id = +req.params.id;
  
//            const artistRepository = AppDataSource.getRepository(Artist);
//            const artist = await artistRepository.findOneBy({
//               id: id,
//            });
  
//            if (!artist) {
//               return res.status(404).json({
//                  message: "Artist not found",
//               });
//            }
//            res.status(200).json(artist);
//         } catch (error) {
//            res.status(500).json({
//               message: "Error while getting artist",
//            });
//         }
//      } 
//      async create(
//         req: Request<{}, {},CreateUserRequestBody>,
//         res: Response
//       ): Promise<void | Response<any>> {
//         const { name, last_name, address, email, phone_number, password_hash } = req.body;
      
//         const userRepository = AppDataSource.getRepository(User);
        
      
//         try {
//           // Crear nuevo artista
//           const newUser = userRepository.create({
//             name,
//             last_name,
//             address,
//             email,
//             phone_number,
//             password_hash: bcrypt.hashSync(password_hash, 10),
//             role: [UserRoles.ARTIST]
//           });
//           await userRepository.save(newUser);
      
//           //Crear nuevo artista asociado al usuario
          
//            if (newUser.role.includes(UserRoles.ARTIST)) { 
//             // Si es un artista, también crea una entrada en la tabla de artistas. 
//             const artistRepository = AppDataSource.getRepository(Artist); 
//             const newArtist = artistRepository.create({ 
//               user_id: newUser.id, // Asocia el nuevo artista con el usuario recién creado. 
//               portfolio: "https://"
//               // Otros campos relacionados con el artista, si es necesario. 
//             }); 
       
//             await artistRepository.save(newArtist); 
//           } 
       
//           res.status(201).json(newUser); 
//         } catch (error: any) { 
//           console.error("Error while creating artist:", error); 
//           res.status(500).json({ 
//             message: "Error while creating artis", 
//             error: error.message, 
//           }); 
//         } 
//       }
//       async update(req: Request, res: Response): Promise<void | Response<any>> {
//         try {
//            const id = +req.params.id;
//            const data = req.body;
  
//            const artistRepository = AppDataSource.getRepository(Artist);
//            const artistUpdated = await artistRepository.update({ id: id }, data);
//            res.status(202).json({
//               message: "Artist updated successfully",
//            });
//         } catch (error) {
//            res.status(500).json({
//               message: "Error while updating artist",
//            });
//         }
//      }
//     }
      
           