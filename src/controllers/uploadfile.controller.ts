
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
            console.log('yes')
            await updateImageFromUrl()
            return res.status(200)


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
            
            const folderName =req.query.folderName as string
            
            if(!folderName){
                return res.status(404).json({
                    status:'Not found folder Name',
                    statusCode:404
                })
            }
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
            console.log(req.body)
            const folderName=req.body.folderName
           console.log('files',files,folderName)
           const parsds= JSON.parse(req.body.currentData)
           console.log(parsds)
            
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