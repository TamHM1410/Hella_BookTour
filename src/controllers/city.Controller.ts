import { cityService } from "../services/cityService/city.serivce";
import { Request, Response } from "express";
class CityController{
    getAllCity=async(req: Request, res: Response)=>{
        const result=await cityService.getCity()
        console.log('result',result)
        return res.status(200).json(result)


    }
}
export const cityController =new CityController()
