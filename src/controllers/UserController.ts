import { Controller } from "./controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";

//----------

export class UserController implements Controller {
  async getAllUsers(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const userRepository = AppDataSource.getRepository(User);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allUsers, count] = await userRepository.findAndCount({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
          id: true,
          name: true,
          last_name: true,
        //   address: true,
        //   email: true,
        //   phone_number: true,
          role_id: true,
        },
      });
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }
}
