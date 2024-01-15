// import { Request, Response } from "express";
// import { User } from "../models/User";
// import { AppDataSource } from "../database/data-source";

// //----------

// export class UserController  {
//   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
//     try {
//       const userRepository = AppDataSource.getRepository(User);

//       let { page, skip } = req.query;

//       let currentPage = page ? +page : 1;
//       let itemsPerPage = skip ? +skip : 10;

//       const [allUsers, count] = await userRepository.findAndCount({
//         skip: (currentPage - 1) * itemsPerPage,
//         take: itemsPerPage,
//         select: {
//           id: true,
//           name: true,
//           last_name: true,
//           role_id: true,
//         },
//       });
//       res.status(200).json({
//         count,
//         skip: itemsPerPage,
//         page: currentPage,
//         results: allUsers,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error while getting users",
//       });
//     }
//   }
//   async getById(req: Request, res: Response): Promise<void | Response<any>> {
//     try {
//       const id = +req.params.id;

//       const userRepository = AppDataSource.getRepository(User);
//       const user = await userRepository.findOneBy({
//         id: id,
//       });

//       if (!user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }

//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({
//         message: "Error while getting user",
//       });
//     }
//   }

//   async create(req: Request, res: Response): Promise<void | Response<any>> {
//     try {
//       const data = req.body;

//       const userRepository = AppDataSource.getRepository(User);
//       const newUser = await userRepository.save(data);
//       res.status(201).json(newUser);
//     } catch (error: any) {
//       console.error("Error while creating user:", error);
//       res.status(500).json({
//         message: "Error while creating user",
//         error: error.message,
//       });
//     }
//   }
//   async update(req: Request, res: Response): Promise<void | Response<any>> {
//     try {
//       const id = +req.params.id;
//       const data = req.body;

//       const userRepository = AppDataSource.getRepository(User);
//       await userRepository.update({ id: id }, data);

//       res.status(202).json({
//         message: "User updated successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error while updating user",
//       });
//     }
//   }
// }

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

export class UserController {
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { name, last_name, address, email, phone_number, password_hash } =
      req.body;

    const userRepository = AppDataSource.getRepository(User);
    //    const studentRepository = AppDataSource.getRepository(Student);

    try {
      // Crear nuevo usuario
      const newUser = userRepository.create({
        name,
        last_name,
        address,
        email,
        phone_number,
        password_hash: bcrypt.hashSync(password_hash, 10),
        // role: [UserRoles.CUSTOMER]
      });
      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Register successfully",
      });
    } catch (error: any) {
      console.error("Error while register:", error);
      res.status(500).json({
        message: "Error while register",
        error: error.message,
      });
    }
  }
  async login(
    req: Request<{}, {}, LoginUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { password_hash, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      // Validar existencia de email y contraseña
      if (!email || !password_hash) {
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
          role: true,
        },
        select: {
          role: {
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
        password_hash,
        user.password_hash
      );

      // Verificar contraseña valida
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Generar token

      const role = user.role.map((role) => role.role_name);

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRoles: [],
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
  async getProfile(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }
  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.update({ id: id }, data);

      res.status(202).json({
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating user",
      });
    }
  }
  async getAllArtists(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const ArtistRepository = AppDataSource.getRepository(Artist);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allArtists, count] = await ArtistRepository.findAndCount({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
          id: true,
          user_id: true,
        },
      });
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allArtists,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting Artists",
      });
    }
  }

}
