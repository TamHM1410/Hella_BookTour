import { PrismaClient } from "@prisma/client";
class Location_Activity_Service{
    private prisma=new PrismaClient()
    constructor() {
        this.prisma = new PrismaClient();
    }
    getAll =async ()=>{
        try{
            await this.prisma.$connect()
            const  allData= await this.prisma.location_Activity.findMany()
            return allData

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect()
        }
    }
    getLoctionActivityByName=async (nameOfActivity :string)=>{
        try{
            await this.prisma.$connect()
            const data= await this.prisma.location_Activity.findFirst({
                where:{
                    activityName: nameOfActivity
                }

            })
            return data

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect()

        }
    }
    // getActivityById =async (activity_id :number)=>{
    //     try{
    //         await this.prisma.$connect()
    //         const data = await this.prisma.location_Activity.findUnique({
    //             where :{
    //                 id:activity_id
    //             }
    //         })
    //         if(data){
    //             return {
    //                 status:'SUCCESS',
    //                 satusCode:203,
    //                 data:data
    //             }
    //         }
    //         return  {
    //                 status :'Error',
    //                 statusCode :400,
    //                 Message: 'get stuck'
    //         }

    //     }catch(error){
    //         return {
    //             status :'Error',
    //             statusCode :500,
    //             Message: 'Internal Internal Server'

    //         }

    //     }finally{
    //         await this.prisma.$disconnect()
    //     }
    // }
    deleteLocationActivityById =async (id:number)=>{
        try{
            await this.prisma.$connect()
            await this.prisma.location_Activity.delete({
                where:{
                    id :id
                }
            })
          
            return {
                StatusCode:200,
                status : 'Success',
                message: 'Delete successfully',
               
            }

        }catch(error){
            console.log(error)
        }finally{
            await this.prisma.$disconnect()
        }
    }
    updateActivity =async(activityData :{
        id: number,
        locationId:number,
        activityName:string,
        activityDescription:string,
        status:boolean,
        createAt: Date,
        updateAt:Date
        deleteAt:Date

    })=>{
        try{
            await this.prisma.$connect()
            const data =await this.prisma.location_Activity.update({
                where:{
                  id :activityData.id
                },
                data:{
                    locationId: activityData.locationId,
                    activityName:activityData.activityName,
                    activityDescription:activityData.activityDescription,
                    status:activityData.status,
                    updateAt: new Date()
                }

            })
            return {
                statusCode:203,
                status:'Update successfully',
                data:data
            }

        }catch(error){
            console.log(error)

        }finally{
            await this.prisma.$disconnect()
        }
    }
    deleteActivity = async (id: number) => {
        try {
            await this.prisma.$connect();
            await this.prisma.location_Activity.delete({
                where: {
                    id: id // Make sure 'id' is defined and passed correctly
                }
            });
            return {
                statusCode: 203,
                status: 'Delete location activity successfully!'
            };
        } catch (error) {
            console.log(error);
            // Handle the error appropriately (e.g., throw or return an error response)
            return {
                statusCode: 500,
                status: 'Internal Server Error'
            };
        } finally {
            await this.prisma.$disconnect();
        }
    };
    createActivity =async (data: {
        locationId:number,
        activityName:string,
        activityDuration:string,
        activityDescription:string,
        status:boolean,
       
    })=>{
        try{
           
            await this.prisma.$connect()
            const createNewActivity =await this.prisma.location_Activity.create({
                data:{
                    locationId:data.locationId,
                    activityName:data.activityName,
                    activityDuration:data.activityDuration,
                    activityDescription:data.activityDescription,
                    status:data.status,
                   
                   
                 

                }
               
            })
            return {
                status :"Success",
                statusCode:203,
                createNewActivity,
            }

        }catch(error){
            console.log(error)

        }finally{
            await this.prisma.$disconnect()

        }

    }

}
export  const location_activity_service=new Location_Activity_Service()