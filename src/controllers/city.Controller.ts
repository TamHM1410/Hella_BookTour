import { cityService } from "../services/cityService/city.serivce";
import { Request, Response } from "express";
class CityController{
    getAllCity=async(req: Request, res: Response)=>{
        const result=await cityService.getCity()
        console.log('result',result)
        return res.status(200).json(result)


    }
    createNewCity =async (req: Request, res: Response)=>{
        const cityData=req.body
        const  result = await cityService.createNewCity(cityData)
        const status=result?.status
        if(status ==="Error"){
            return res.status(409).json(result)
        }
         return res.status(200).json(result)

     
    }
    updateCity =async (req: Request, res: Response)=>{
        try {
            const currentData = req.body as {
                id: number;
                cityName: string;
                country: string;
                status: boolean;
                createAt: Date;
                updateAt: Date;
                deleteAt: Date;
            };
          const result=  await cityService.editCity(currentData)
            // const result = await cityService.editCity(currentData);
            return res.status(200).json(result);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    getCurrentCity =async (req: Request, res: Response) =>{
        const cityId =req.body.id
       
        const result = await cityService.getCurrentCity(cityId)
        return res.status(200).json(result)


    }
    deleteCurrentCity =async (req:Request,res:Response)=>{
            try{
                const cityId=req.body.id
                const result= await cityService.deleteCity(cityId)
                return res.status(200).json(result)

            }catch(error){
                console.log(error)
                return res.status(500).json({
                    error: 'Internal Server Error'
                    

                })
            }
    }
}
export const cityController =new CityController()
