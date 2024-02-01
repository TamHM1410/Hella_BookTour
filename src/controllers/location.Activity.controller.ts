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
    // getActivityById =async (req: Request, res: Response)=>{
    //     try{

    //     const  activity_id:number=req.body.id
    //     const result =await location_activity_service.getActivityById(activity_id)
    //     if(result){
    //         return res.status(200).json(result)
    //     }
      
    //      }catch(error){
            
    //         return res.status(500).json({
    //             Message: 'Bad request'
    //         })

    //     }
    // }
    updateActivityById =async(req: Request, res: Response) =>{
        try{
            const activityData =req.body as {
                id: number,
                locationId:number,
                activityName:string,
                activityDescription:string,
                status:boolean,
                createAt: Date,
                updateAt:Date
                deleteAt:Date

            }
            const result =await location_activity_service.updateActivity(activityData)
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return  res.status(500).json({
                status:"Bad request"
            })
        }
    }
    delete =async (req: Request, res: Response)=>{
        try{
            const activityId= req.body.id as number
            const result =await location_activity_service.deleteActivity(activityId)
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            console.log(error)
        }
    }
    create =async(req: Request, res: Response)=>{
        try{
            const data = req.body as {
                locationId:number,
                activityName:string,
                activityDuration:string,
                activityDescription:string,
                status:boolean,
              
            }
             console.log(data,'data')
            const result =await location_activity_service.createActivity(data)
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            console.log(error)
        }
    }
}
export const locationActivityController=new LocationActivityController()