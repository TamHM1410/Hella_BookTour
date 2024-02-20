import { locationInTourService } from "../services/locationInTourService/locationInTour.service";
import { Request,Response } from "express";
class LocationInTourController {
     getAll =async (req:Request,res:Response)=>{
        try{
            const  result = await locationInTourService.getAll()
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500


            })
            
        }
     }
     getById =async (req:Request,res:Response)=>{
      try{
        const id =req.body.id  as number
        const result =await locationInTourService.getById(id)
        if(result){
            return  res.status(result.statusCode).json(result)

        }
      }catch(error){
        return res.status(500).json({
            status:'Internal Server',
            statusCode:500


        })
        

      }
     }
     updateById =async (req:Request,res:Response)=>{
        try{
            const currentData =req.body as {
                locationId:number,
                tourId:number,
                duration:string,
                status:boolean,
                description:string,
                startCity:string,
                endCity:string,
                id:number
        
            }
            const result =await locationInTourService.updateById(currentData)
            if(result){
                return  res.status(result.statusCode).json(result)
    
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
    
    
            })
            
        }
     }
    createNew =async (req:Request,res:Response)=>{
        try{
             const currentData=req.body as {
                locationId:number,
                tourId:number,
                duration:string,
                status:boolean,
                description:string,
                startCity:string,
                endCity:string
            }
             const result =await locationInTourService.createNewLocationInTour(currentData)
             if(result){
                return  res.status(result.statusCode).json(result)
    
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
    
    
            })

        }
    }
    deleteById =async (req:Request,res:Response)=>{
        try{
            const paramId=req.params.id
            const  id=+paramId
            const result =await locationInTourService.deleteById(id)
            if(result){
                return  res.status(result.statusCode).json(result)
    
            }


        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
    
    
            })

        }
    }
}
export const locationInTourController =new LocationInTourController()