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
        const hour = 3600000; // 1 giờ tính bằng mili giây
        const expiryDate = new Date(Date.now() + hour);
              
              res.cookie("token", result.token, { httpOnly: false, secure: true, sameSite:"strict" ,domain:"hella-booking.onrender.com",  expires: expiryDate,maxAge:hour});
              res.cookie("userData", result.userData, { httpOnly: false, secure: true, sameSite: "strict",domain:"hella-booking.onrender.com" ,  expires: expiryDate,maxAge:hour});
              res.cookie('myCookie', 'cookieValue', { 
                expires: expiryDate,
                httpOnly: false,
                secure: true,
                sameSite: 'none',
                domain:"hella-booking.onrender.com" ,
                maxAge: hour // hoặc sử dụng maxAge thay vì expires
            })
        

        return res.status(result.statusCode).json(result)
      }
        
    }
}

export const accessController = new AccessController();
