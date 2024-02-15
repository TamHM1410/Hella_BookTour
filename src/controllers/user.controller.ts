import { userService } from "../services/userService/user.service"
import { Request,Response } from "express";
class UserController {
    updateUser = async (req:Request,res:Response) =>{
        try{
            const currentData= req.body
            const result =await userService.updateUser(currentData)
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
    getUserById =async (req:Request,res:Response)=>{
        try{
            const id     = req.body.id
            const result = await userService.getUserById(id)
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
    getAllUser =async (req:Request,res:Response)=>{
        try{
            const result = await userService.getAllUser()
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
    deleteUserById =async (req:Request,res:Response)=>{
        try{
            const id     = req.body.id
            const result = await userService.deleteById(id)
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
export const userController =new  UserController()