import { Request, Response } from "express";

//----------------------------------------------------------//

export interface Controller {
    // createUser(req: Request, res: Response): Promise<void | Response<any>>;
    // loginUser(req: Request, res: Response): Promise<void | Response<any>>;
    // getProfile(req: Request, res: Response): Promise<void | Response<any>>;
    // updateProfile(req: Request, res: Response): Promise<void | Response<any>>;
    getAllUsers(req: Request, res: Response): Promise<void | Response<any>>;


    // createAppointment(req: Request, res: Response): Promise<void |Response<any>>;
    // updateAppointment(req: Request, res: Response): Promise<void | Response<any>>;
    // DeleteAppointment(req: Request, res: Response): Promise<void |Response<any>>;
    // getUserAppointment(req: Request, res: Response): Promise<void | Response<any>>;
    // getArtistAppointments(req: Request, res: Response): Promise<void | Response<any>>;
    // getArtists(req: Request, res: Response): Promise<void | Response<any>>;
}