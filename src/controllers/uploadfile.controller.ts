
import { Request,Response } from "express";
import { updateImageFromUrl ,upLoadFiles} from "../services/uploadFile/upload.service";
declare module 'express' {
    interface Request {
        files?: any;
    }
}
class UploadfileController{
    uploadFile =async (req:Request,res:Response)=>{
        try{
            const result =await updateImageFromUrl()
            return res.status(200).json(result)


        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:'internal server',
                statusCode:500
            })
        }
    }
    uploadFiles = async (req:Request,res:Response)=>{
        try{
         
            const {files} =req
            console.log(req.files)
            if(!files){
                return  res.status(401).json({
                    status:'Files missing',
                    statusCode:401
                })
            }
            const result =await upLoadFiles(files)
            return result ? res.status(200).json({
                status:'success missing',
                statusCode:201,
                metaData:result
            }):res.status(401).json({
                status:'Files missing',
                statusCode:401
            })

        }catch(error){
            console.log(error)
        }
    }


}
export const uploadfileController= new UploadfileController()