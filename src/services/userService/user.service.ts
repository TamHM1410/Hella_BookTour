import user from "../../models/UserModel"
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo"
import mongoose from "mongoose"
class UserService {
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
    getAllUser =async ()=>{
        try{
            await instanceMongo()
            const data = await user.find()
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }: this.errorMessage

        }catch(error){
            return this.errorMessage
        }
    }
    getUserById=async (id:string)=>{
        try{
            await instanceMongo()
            const data = await user.findById({_id:new mongoose.Types.ObjectId(id)})
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }: this.errorMessage


        }catch(error){
            return this.errorMessage
        }
    }
    updateUser=async (currentData :{
        fullName:string,
        id:string,
        phone:string,
        gender:string,
        roleId:number,
        
    })=>{
        try{
            await instanceMongo()
            const data = await user.findById({_id:new mongoose.Types.ObjectId(id)})
            return data ? {
                status:'Success',
                statusCode:201,
                data:data
            }: this.errorMessage


        }catch(error){
            return this.errorMessage
        }
    }

}
export const userService =new UserService()