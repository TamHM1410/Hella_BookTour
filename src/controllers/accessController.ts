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
              res.cookie("token", result.token, { httpOnly: false, secure: true, sameSite:"none" ,domain:"hella-booking.onrender.com"});
              res.cookie("userData", result.userData, { httpOnly: false, secure: true, sameSite: "none",domain:"hella-booking.onrender.com" });
              // res.setHeader('token', `jwt=${result.token}; HttpOnly; Domain=.hella-booking.onrender.com; Path=/; SameSite=none; secure; Max-Age=31536000`) 
              // res.header('Access-Control-Allow-Origin','https://localhost:3000')
              // res.header('Access-Control-Allow-Credentials','true')
              // res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')

        return res.status(result.statusCode).json(result)
      }
        
    }
}

export const accessController = new AccessController();
