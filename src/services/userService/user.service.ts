import user from "../../models/UserModel"
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo"
import mongoose from "mongoose"
import  bcrypt from 'bcryptjs'
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
    deleteUserById=async (currentData:{
        id:string,
        deleteAt:string
    })=>{
        try{
            await instanceMongo()
           await user.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(currentData.id)},{deleteAt:currentData.deleteAt})
            return  {
                status:'Success',
                statusCode:201,
                
            }


        }catch(error){
            return this.errorMessage
        }
    }
    updateUser  = async (currentData :{
        fullName:string,
        id:string,
        phone:string,
        gender:string,
        roleId:number,
        password:string,


    })=>{
        try{
            await instanceMongo()
            const data = await user.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(currentData.id)},{fullName:currentData.fullName,phone:currentData.phone,gender:currentData.gender,roleId:currentData.roleId})
            return  data ? { status:'Success',
                             statusCode:201,
                             data:data

          }:this.errorMessage

        }catch(error){
             return this.errorMessage
        }

    }
    updatePassword=async (currentData :{
        fullName:string,
        id:string,
        phone:string,
        gender:string,
        roleId:number,
        password:string,


    })=>{
        try{
            await instanceMongo()
            const hashPassword =await bcrypt.hash(currentData.password,10)
            const currentUser = await user.findById({_id:new mongoose.Types.ObjectId(currentData.id)})
            if(currentUser){
                const compare = await bcrypt.compare(currentData.password,currentUser.password)
                if(compare===true){
                    const data = await user.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(currentData.id)},{password:hashPassword})
                    return data ? {
                        status:'Success',
                        statusCode:201,
                        data:data
                    }: this.errorMessage
        

                }else{
                    return {
                        status:'Incorrect Password',
                        statusCode: 401
                    }
                }

            }
            
            }catch(error){
            return this.errorMessage
        }
    }

}
export const userService =new UserService()