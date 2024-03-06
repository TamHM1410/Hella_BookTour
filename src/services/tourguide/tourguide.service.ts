
import mongoose from "mongoose";
import tourguide from "../../models/Tourguild";
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo";
class TourguideService{
      createTourguide =async(currentData :{
        userId:string
      }) =>{
        try{
            await instanceMongo()
            const createNewTourguide = await tourguide.create({
                userId:new mongoose.Types.ObjectId(currentData.userId),



            })
            return createNewTourguide ? {
                status:"Success",
                statusCode:201,
                data:createNewTourguide
            }:{
                status:'something missing',
                satusCode:409
            }

        }catch(error){
            return {
                status:'Internal server',
                statusCode:500,
                EM:error
            }
        }
      }
      getAllTourguide =async ()=>{
        try{
            await instanceMongo()
            const data =await tourguide.find().populate('userId')
            return data ? {
                status:"Success",
                statusCode:201,
                data:data
            }:{
                status:'Not found',
                satusCode:404

            }

        }catch(error){
            console.log(error)
            return {
                status:'Internal server',
                statusCode:500,
                EM:error
            }

        }
      }
}
const tourguideService =new TourguideService()
export default tourguideService