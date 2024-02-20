
import { paymentMethod } from "../services/paymentMethodService/payment_Method.serivce";
import { Request,Response } from "express";
class PaymentMethodController {
    getAll =async (req:Request,res:Response)=>{
        try{
            const result = await paymentMethod.getAll()
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
    getById =async (req:Request,res:Response)=>{
        try{
            const id =req.body.id
            const result = await paymentMethod.getById(id)
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
    getByPaymentType=async (req:Request,res:Response)=>{
        try{
            const paymentType =req.body.paymentType
            const result = await paymentMethod.getByPaymentType(paymentType)
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
    deleteById =async (req:Request,res:Response)=>{
        try{
            const paramId=req.params.id
            const id =+paramId
            const result = await paymentMethod.deleteById(id)
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
    create =async (req:Request,res:Response)=>{
        try{
            const currentData=req.body
            const result = await paymentMethod.createNew(currentData)
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
    update =async (req:Request,res:Response)=>{
        try{
            const currentData=req.body
            const result = await paymentMethod.updatePayment(currentData)
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
export const paymentMethodController= new PaymentMethodController()