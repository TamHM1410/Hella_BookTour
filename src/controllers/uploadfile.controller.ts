
import { Request,Response } from "express";
import { updateImageFromUrl ,upLoadFiles,getAllimage} from "../services/uploadFile/upload.service";
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
    getAllImage =async (req:Request,res:Response)=>{
        try{
            const folderName =req.body.folderName
            const result =await getAllimage(folderName)
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
            const folderName=req.body.folderName
           
            
            if(!files){
                return  res.status(401).json({
                    status:'Files missing',
                    statusCode:401
                })
            }
            const result =await upLoadFiles(files,folderName)
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