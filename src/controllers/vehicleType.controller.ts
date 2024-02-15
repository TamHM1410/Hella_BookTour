import { vehicleTypeService } from "../services/vehicleService/vehicleType.service";
import { Request,Response } from "express";
class VehicleController {
    getAll =async (req:Request,res:Response)=>{
        try{
            const result = await vehicleTypeService.getAll()
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }
    getByName=async (req:Request,res:Response)=>{
        try{
            const vehicleName =req.body.vehicleName
            const result = await vehicleTypeService.getByName(vehicleName)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }
    getById=async (req:Request,res:Response)=>{
        try{
            const id =req.body.id
            const result = await vehicleTypeService.getById(id)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }
    deleteById=async (req:Request,res:Response)=>{
        try{
            const id =req.body.id
            const result = await vehicleTypeService.deleteById(id)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }
    create=async (req:Request,res:Response)=>{
        try{
            const currentData=req.body
            const result = await vehicleTypeService.createNew(currentData)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }
    update=async (req:Request,res:Response)=>{
        try{
            const currentData=req.body
            const result = await vehicleTypeService.updateNew(currentData)
            if(result){
                return  res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status: 'Internal server',
                statusCode:500
            })

        }
    }

}
export const vehicleController =new VehicleController()