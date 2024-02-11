import { locationService } from "../services/locationService/locationSerivce"
import { Request, Response } from "express";
class LocationController{
    getAll =async (req:Request,res:Response)=>{
        try{
            const result =await locationService.getAllLocation()
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return  res.status(500).json({
                    status:'Internal Error',
                    statusCode:500

            })

        }
    }
    createLocation =async (req:Request,res:Response)=>{
        try{
            const data =req.body as {
                cityId:number,
                locationName:string,
                locationAddress:string,
                status: boolean
          }
         console.log(data,'s')
            const result=await locationService.createLocation(data)
            if(result){
                return  res.status(result.statusCode).json(result)
            }
            
        }catch(error){
            return  res.status(500).json({
                status:'Internal Error',
                statusCode:500

        })

        }
    }
    getLocationByName= async (req:Request,res:Response)=>{
        try{
            const  LocationName= req.body.locationName
            const result =await locationService.getLocationByLocationName(LocationName)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:666
            })
        }
    }
    getLocationByAdress =async (req:Request,res:Response)=>{
        try{
            const LocationAddress =req.body.locationAddress
            const result =await locationService.getLocationByAddress(LocationAddress)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:666
            })
        }
    }
    updateLocation =async(req:Request,res:Response)=>{
        try{
            const currentData =req.body as {
                id:number,
                cityId:number,
                locationName:string,
                locationAddress:string,
                status:boolean
        
            }
            const id=req.params.id
            console.log('id',id)
            const result = await locationService.updateLocationById(currentData)
            if(result){
                return  res.status(result.statusCode).json(result)
            }


        }catch(error){
            return res.status(500).json({
                status:'Internal server error!',
                statusCode:500
            })
        }
    }
    deleteLocation =async (req:Request,res:Response)=>{
        try{
            const currentId= req.body.id
            const result =await locationService.deleteLocationById(currentId)
            if(result){
                return  res.status(result.statusCode).json(result)
            }
            

        }catch(error){
            return res.status(500).json({
                status:'Internal server error!',
                statusCode:500
            })

        }
    }

}
export const locationController =new LocationController()