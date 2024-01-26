import { PrismaClient } from "@prisma/client";
class Location_Activity_Service{
    private prisma=new PrismaClient()
    constructor() {
        this.prisma = new PrismaClient();
    }
    getAll =async ()=>{
        try{
            await this.prisma.$connect
            const  allData= await this.prisma.location_Activity.findMany()
            return allData

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect
        }
    }
    getLoctionActivityByName=async (nameOfActivity :string)=>{
        try{
            await this.prisma.$connect
            const data= await this.prisma.location_Activity.findFirst({
                where:{
                    activityName: nameOfActivity
                }

            })
            return data

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect

        }
    }
    deleteLocationActivityById =async (activity_id:number)=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.location_Activity.delete({
                where:{
                    id :activity_id
                }
            })
            if(!data){
                return  {
                    status :'Error',
                    StatusCode:500,
                    message:'Activity not exist!'
                }
            }
            return {
                StatusCode:200,
                status : 'Success',
                message: data,
               
            }

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect
        }
    }

}
export  const location_activity_service=new Location_Activity_Service()