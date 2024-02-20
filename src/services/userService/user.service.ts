
import user from "../../models/UserModel"
import mongoose, { now } from "mongoose"
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo"
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
            const result =await user.find()
            if(result){
                return {
                    status:'Success!',
                    statusCode:201,
                    data:result
                }
            }

        }catch(error){
            return  {
                status:'Internal Server',
                statusCode:500,
                msg:error
            }

        }
    }
    getUserById = async (id:string) =>{
        try{
            await instanceMongo()
            const data = await user.findById({_id: new mongoose.Types.ObjectId(id)})
            if(data){
                return  {
                    status:'Success',
                    statusCode:201,
                    data:data
                }
            }


        }catch(error){
            return  {
                status:'Internal Server',
                statusCode:500
            }
        }
    }
    deleteById = async (id:string) =>{
        try{
            await instanceMongo()
            await user.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)},{deleteAt:now()})
            return  {
                status:'Success',
                statusCode:201,
                
            }
           


        }catch(error){
            return  {
                status:'Internal Server',
                statusCode:500
            }
        }
    }
     updateUser =async (currentData:{
        fullName:string ,
        email:string,
        password:string,
        roleId:number,
        phone:string,
        gender:string,
        deleteAt:string,
        id:string



     }) =>{
        try{
            const updateUser = await user.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(currentData.id)},
                                                           {fullName:currentData.fullName,
                                                            email:currentData.email,
                                                            password:currentData.password,
                                                            roleId:currentData.roleId,
                                                            phone:currentData.phone,
                                                            gender:currentData.gender,
                                                            deleteAt:currentData.deleteAt }) 
            if(updateUser){
                return {
                    status:'Success',
                    statusCode:201,
                    data:updateUser
                }
            }

        



        }catch(error){
            return  {
                status:'Internal Server',
                statusCode:500
            }
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