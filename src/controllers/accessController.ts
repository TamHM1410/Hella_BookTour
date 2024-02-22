import { Request, Response } from "express";
import { accesssService } from "../services/accessService/accessService";

interface Data {
    email: string,
    fullName: string,
    password: string,
    phone: string,
    gender: string
}
interface CustomRequest extends Request {
  userId?: string; // Define userId property as optional
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
              
              
            
            res.cookie('token', result.token, { 
              expires: expiryDate,
              httpOnly: false,
              secure: true,
              sameSite: 'none',
              domain:"hella-booking.onrender.com" ,
              maxAge: hour 
          })
          res.cookie('userData', result.userData, { 
            expires: expiryDate,
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            domain:"hella-booking.onrender.com" ,
            maxAge: hour
        })
      
        

        return res.status(result.statusCode).json(result)
      }
        
    }
    logOut=async(req:CustomRequest,res:Response)=>{
      try{
        const userId=req.userId
        if(userId){
          const result =await accesssService.logOut(userId)
          return res.status(result.statusCode).json(result)

        }else {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'User ID is missing',
            statusCode: 400
        });
        }
        


      }catch(error){
        return res.status(500).json({
          status:'Internal server',
          statusCode:500
        })
      }
    }
}

export const accessController = new AccessController();
