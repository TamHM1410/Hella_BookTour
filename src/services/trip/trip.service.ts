import { PrismaClient } from "@prisma/client";
class TripService {
    private prisma= new PrismaClient()
    constructor(){
        this.prisma = new PrismaClient();
    }
    deleteTripById =async(id:number)=>{
        try{
            await this.prisma.$connect
            await this.prisma.trip.delete({
                where:{
                    id:id
                }
            })
            return {
                status:'Delete success!',
                statusCode:201
            }
            
        }catch(error){
            return {
                 status:'Internal server',
                 statusCode:500
            }
        }
    }
    getAllTrip =async ()=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.trip.findMany()
            if(data){
                return  {
                    status:'Success !',
                    statusCode:201,
                    data:data
                }
            }


        }catch(error){
             return {
                status :'Internal server',
                statusCode:500
             }
        }finally{
            await this.prisma.$disconnect
        }
    }
    createNewTrip = async (currentData: {
        tourId:number,
        totalCustomer:number,
        startDate:string,
        endDate:string,
        status:boolean,
        tourGuideId:number
    }) =>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.trip.create({
                data:{
                    tourId:currentData.tourId,
                    totalCustomer:currentData.totalCustomer,
                    startDate:currentData.startDate,
                    endDate:currentData.endDate,
                    status:currentData.status,
                    tourGuideId:currentData.tourGuideId

                }

            })
            if(data){
                return {
                    status:'success',
                    statusCode:201,
                    data:data
                }

            }

        }catch(error){
            return {
                status:'Internal server',
                statusCode:500
            }
        }
    }
    updateTrip =async (currentData: {
        tourId:number,
        totalCustomer:number,
        startDate:string,
        endDate:string,
        status:boolean,
        tourGuideId:number,
        id:number

    })=>{
        try{
             await this.prisma.$connect
             const data= await this.prisma.trip.update({
                where:{
                    id:currentData.id
                },
                data:{

                    tourId:currentData.tourId,
                    totalCustomer:currentData.totalCustomer,
                    startDate:currentData.startDate,
                    endDate:currentData.endDate,
                    status:currentData.status,
                    tourGuideId:currentData.tourGuideId

                }
             })
             if(data){
                return {
                    status:'internal server',
                    statusCode:201,
                    data:data
                }
             }
        }catch(error){
            return {
                status:'Internal server',
                statusCode:500

            }
        }
    }
    getTripById =async (id:number)=>{
        try{
            
            await this.prisma.$connect  
            const data =await this.prisma.trip.findFirst({
                where :{
                    id: id
                }
            })
            if(data){
                return  {
                    status:'Success !',
                    statusCode:201,
                    data:data
                }
            }


        }catch(error){
             return {
                status :'Internal server',
                statusCode:500
             }
        }finally{
            await this.prisma.$disconnect
        }
    }

}
export const tripService =new TripService()