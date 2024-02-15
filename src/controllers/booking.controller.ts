import { Request,Response } from "express"
import { bookingService } from "../services/bookingService/booking.service"
class BookingController {
      getAll = async (req:Request,res:Response)=>{
        try{
             const  result = await bookingService.getAll()
             if(result){
                return res.status(result.statusCode).json(result)
             }
            
        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500
            }
        }
      }
      getById =async (req:Request,res:Response)=>{
        try{
             const id=req.body.id
             const  result = await bookingService.getById(id)
             if(result){
                return res.status(result.statusCode).json(result)
             }
            
        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500
            }
        }
      }
     deleteById =async (req:Request,res:Response)=>{
        try{
             const id=req.body.id
             const  result = await bookingService.deleteById(id)
             if(result){
                return res.status(result.statusCode).json(result)
             }
            
        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500
            }
        }
      }
      createBooking =async (req:Request,res:Response)=>{
        try{
             const currentData=req.body  as {
                bookingDate:string,
                fromDate:string,
                toDate:string,
                userId:string,
                totalAmount:number,
                status:boolean,
                tripId:number,
                totalCustomer:number
        
            }
             const  result = await bookingService.createBooking(currentData)
             if(result){
                return res.status(result.statusCode).json(result)
             }
            
        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500
            }
        }
      }
      updateBooking =async (req:Request,res:Response)=>{
        try{
             const currentData=req.body  as {
                bookingDate:string,
                fromDate:string,
                toDate:string,
                userId:string,
                totalAmount:number,
                status:boolean,
                tripId:number,
                totalCustomer:number,
                id:number
        
            }
             const  result = await bookingService.updatebooking(currentData)
             if(result){
                return res.status(result.statusCode).json(result)
             }
            
        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500
            }
        }
      }
}
export const bookingController =new BookingController()