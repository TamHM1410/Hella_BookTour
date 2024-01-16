import { Request, Response } from "express";
import { accesssService } from "../services/accessService/accessService";

interface Data {
    email: string,
    fullName: string,
    password: string,
    phone: string,
    gender: string
}

class AccessController {
    signUp = async (req: Request, res: Response) => {
        await accesssService.signUp(req.body as Data);
        return res.status(200).json({ message: 'success' });
    }
    signIn= async (req:Request,res:Response)=>{
      const result=  await accesssService.signIn(req.body as Data)
        return res.status(200).json(result);
    }
}

export const accessController = new AccessController();
