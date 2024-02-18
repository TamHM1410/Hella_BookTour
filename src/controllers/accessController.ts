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
       const result= await accesssService.signUp(req.body as Data);
      
       if(result && result.status==='Error'){
        return res.status(500).json(result)
       }
        return res.status(200).json( result);
    }
    signIn= async (req:Request,res:Response)=>{
      const result=  await accesssService.signIn(req.body as Data)
      
      if(result){
              res.cookie("token", result.token, { httpOnly: true, secure: true, sameSite: "none" });
              res.cookie("userData", result.userData, { httpOnly: true, secure: true, sameSite: "none" });

        return res.status(result.statusCode).json(result)
      }
        
    }
}

export const accessController = new AccessController();
