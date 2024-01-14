import { Request, Response } from "express";
import {
   CreateUserRequestBody,
   LoginUserRequestBody,
   TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Artist } from "../models/Artist";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthController {
    async register(
       req: Request<{}, {}, CreateUserRequestBody>,
       res: Response
    ): Promise<void | Response<any>> {
       const { name, last_name, password_hash, email } = req.body;
 
       const userRepository = AppDataSource.getRepository(User);
       const artistRepository = AppDataSource.getRepository(Artist);
 
       try {
          // Crear nuevo usuario
          const newUser: User = {
             name,
             last_name,
             email,
             password_hash: bcrypt.hashSync(password_hash, 10),
             role_id: ,
          };
          await userRepository.save(newUser);
 
          // Crear un artista
         
         // const newArtist: User = {
         //    username,
         //    name,
         //    surname,
         //    email,
         //    password_hash: bcrypt.hashSync(password, 10),
         //    roles: [UserRoles.ADMIN],
         // };
         // await userRepository.save(newArtist)
 
          res.status(StatusCodes.CREATED).json({
             message: "User created successfully",
          });
       } catch (error: any) {
         console.error("Error while creating Appointment:", error);
         res.status(500).json({
           message: "Error while creating Appointment",
           error: error.message,
         });
       }
     }
 
    async login(
       req: Request<{}, {}, LoginUserRequestBody>,
       res: Response
    ): Promise<void | Response<any>> {
       const { password, email } = req.body;
 
       const userRepository = AppDataSource.getRepository(User);
 
       try {
          // Validar existencia de email y contraseña
          if (!email || !password) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email or password is required",
             });
          }
 
          // Encontrar un usuario por email
          const user = await userRepository.findOne({
             where: {
                email: email,
             },
             relations: {
                roles: true,
             },
             select: {
                roles: {
                   role_name: true,
                },
             },
          });
 
          // Verificar usuario inexistente
          if (!user) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad email or password",
             });
          }
 
          // Verificar contraseña si el usuario existe
          const isPasswordValid = bcrypt.compareSync(
             password,
             user.password_hash
          );
 
          // Verificar contraseña valida
          if (!isPasswordValid) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad email or password",
             });
          }
 
          // Generar token
 
          const roles = user.role.map((role) => role.role_name);
 
          const tokenPayload: TokenData = {
             userId: user.id?.toString() as string,
             userRoles: roles,
          };
 
          const token = jwt.sign(tokenPayload, "123", {
             expiresIn: "3h",
          });
 
          res.status(StatusCodes.OK).json({
             message: "Login successfully",
             token,
          });
       } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message: "Error while login",
             error,
          });
       }
    }
 }