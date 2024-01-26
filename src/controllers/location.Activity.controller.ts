import { location_activity_service } from "../services/locationActivities_Service/location.activity.service";
import { Request, Response } from "express";
class  LocationActivityController{
    getAllLocationActivity =async (req: Request, res: Response)=>{
         try{
            const result = await location_activity_service.getAll()
            return res.status(202).json(result)

         }catch(error){
            console.log(error)
            return res.status(500).json({
                Message: 'Bad request'
            })
         }
           

    }
    getActivityByName=async (req: Request, res: Response) =>{
        try{
           const nameOfActivity:string= req.body.activityName
           const result = await location_activity_service.getLoctionActivityByName(nameOfActivity)
           return res.status(203).json(result)
        }catch(error){
            console.log(error)
            return res.status(500).json({
                Message: 'Bad request'
            })

        }
    }
    getActivityById =async (req: Request, res: Response)=>{
        try{

        const  activity_id:number=req.body.id
        const result =await location_activity_service.deleteLocationActivityById(activity_id)
        if(result){
            return res.status(result.StatusCode).json(result)

           
        }
      
        

        }catch(error){
            
            return res.status(500).json({
                Message: 'Bad request'
            })

        }
    }
}
export const locationActivityController=new LocationActivityController()