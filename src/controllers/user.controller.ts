import { userService } from "../services/userService/user.service"
import { Request,Response } from "express";
class UserController {
    private errorMessage = {
        status:'Internal server',
        statusCode:501,
    }
    constructor(){
        this.errorMessage= {
            status:'Internal server',
            statusCode:501,
        }
    }
    updateUser = async (req:Request,res:Response) =>{
        try{
            const currentData= req.body
            const result =await userService.updateUser(currentData)
            return result ? res.status(result.statusCode).json(result) : this.errorMessage

        }catch(error){
            return this.errorMessage

        }
    }
    getUserById =async (req:Request,res:Response)=>{
        try{
            const id     = req.body.id
            const result = await userService.getUserById(id)
            return result ? res.status(result.statusCode).json(result) :this.errorMessage

        }catch(error){
            return  this.errorMessage
        }
    }
    getAllUser =async (req:Request,res:Response)=>{
        try{
            const result = await userService.getAllUser()
            return result ? res.status(result.statusCode).json(result) : this.errorMessage


        }catch(error){
            return  this.errorMessage
        }
    }
    deleteUserById =async (req:Request,res:Response)=>{
        try{
            const id     = req.params.id
            const result = await userService.deleteUserById(id)
            return result ? res.status(result.statusCode).json(result) :this.errorMessage

        }catch(error){
            return this.errorMessage

        }
    }
    changePassword = async (req:Request,res:Response)=>{
        try{
            const currentData= req.body
            const result =await userService.updatePassword(currentData)
            return result ? res.status(result.statusCode).json(result) :this.errorMessage

        }catch(error){
            return this.errorMessage
        }
    }

}
export const userController =new  UserController()