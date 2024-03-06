import { Request, Response } from "express";
import tourguideService from "../services/tourguide/tourguide.service";
class TourguideController {
    createTourguide =async(req:Request,res:Response)=>{
        try{
            const currentData=req.body
            const result =await tourguideService.createTourguide(currentData)
            return result ? res.status(201).json(result) : res.status(404).json({
                status:'Not found user id',
                statusCode:404
            })

        }catch(error){
            return res.status(500).json({
                status:"internal server",
                statusCode:500,
                EM:error
            })
        }
    }
    getAllTourguide =async (req:Request,res:Response)=>{
        try{
            const result =await tourguideService.getAllTourguide()
            return result ? res.status(201).json(result) : res.status(404).json({
                status:'Not found user id',
                statusCode:404
            })

        }catch(error){
            return res.status(500).json({
                status:"internal server",
                statusCode:500,
                EM:error
            })

        }
    }
}
const tourguideController =new TourguideController()
export default tourguideController