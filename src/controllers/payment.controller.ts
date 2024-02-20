import { paymentService } from "../services/paymentService/payment.service";
import { Request,Response } from "express";
class Payment{
    getAll =async (req:Request,res:Response)=>{
        try{
            const result=await paymentService.getAll()
          
            
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
            })
        }
    }
    deletetById =async (req:Request,res:Response)=>{
        try{
            const paramId=req.body.id 
            const id :number=+paramId
            const result=await paymentService.deleteById(id)
            
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
            })
        }
    }
    getPaymentByName =async (req:Request,res:Response) =>{
        try{

            const paymentName =req.body.paymentName as string
            const result = await paymentService.getPaymentByName(paymentName)
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
            })
        }
    }
    getPaymentById =async (req:Request,res:Response) =>{
        try{

            const id =req.body.id as number
            const result = await paymentService.getPaymentById(id)
            if(result){
                return res.status(result.statusCode).json(result)
            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
            })
        }
    }
    createNewPayment =async (req:Request,res:Response)=>{
        try{
            const currentData = req.body 
            const result =await paymentService.createNewPayment(currentData)
            if(result){
                return res.status(result.statusCode).json(result)

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
            const currentData =req.body 
            const result =await paymentService.updatePaymentById(currentData)
            if(result){
                return res.status(result.statusCode).json(result)

            }

        }catch(error){
            return res.status(500).json({
                status:'Internal Server',
                statusCode:500
            })

        }
    }
    

}
export const paymentController=new Payment()