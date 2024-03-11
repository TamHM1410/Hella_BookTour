import { PrismaClient } from "@prisma/client";
class BookingService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    getAll = async (page: number, pageSize: number)=>{
        try{
            const startIndex = (page - 1) * pageSize;
            // Lấy tổng số lượng mục từ cơ sở dữ liệu
            const totalItems = await this.prisma.city.count();
            await this.prisma.$connect
            const data =await this.prisma.booking.findMany({
                skip: startIndex,
                take: pageSize,
            })
            if(data){
                return {
                    status:'Success!',
                    statusCode:201,
                    data:data

                }
            }

        }catch(error){
            return {
                status:'Internal Server',
                statusCode: 500
            }

        }finally{
            await this.prisma.$disconnect
        }
    }
    getById = async (id:number)=>{
        try{
            await this.prisma.$connect
            const data = await this.prisma.booking.findFirst({
                where :{
                    id:id
                }
            })
            if(data){
                return {
                    status:'Success!',
                    statusCode:201,
                    data:data

                }

            }

        }catch(error){
            return {
                status:'Internal Server',
                statusCode: 500
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    deleteById =async (id:number)=>{
        try{
            await this.prisma.$connect
            await this.prisma.booking.delete({
                where :{
                    id:id
                }
            })
            return {
                status:'Delete Success!',
                statusCode:204,

            }

        }catch(error){
            return {
                status:'Internal Server',
                statusCode: 500
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    updateStatusById =async(id:number,status:boolean)=>{
        try{
            await this.prisma.$connect
            const updateData = await this.prisma.booking.update({
                where:{
                    id:id
                },
                data:{
                    status:status

                },})
            return {
                status:"success",
                statusCode:201,
                data :updateData,
                
            }

        }catch(error){
            console.log(error)
            return {
                status:'Internal Server',
                statusCode: 500
            }
        }
    }
    deleteBookingByStatusAndCurrentDate =async(userId:string)=>{
        try{
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1; // Tháng bắt đầu từ 0
            const year = today.getFullYear();
            const currentDate = `${day}-${month}-${year}`;
            await this.prisma.$connect
            const rs= await this.prisma.booking.deleteMany({
                where:{
                    status:false,
                    bookingDate:currentDate,
                    userId:userId
                    

                }
            })
            if(!rs){
                return {
                    status:"No data",
                    statusCode:404,
                }
            }
           
            return {
                status:"success",
                statusCode:204,
               
                
            }

        }catch(error){
            return {
                status:'Internal Server',
                statusCode: 500
            }
        }
    }
    updatebooking = async (currentData : {
        bookingDate:string,
      
        userId:string,
        totalAmount:number,
        status:boolean,
        tripId:number,
        totalCustomer:number,
        id:number

    })=>{
        try{
            await this.prisma.$connect
            const updateData = await this.prisma.booking.update({
                where:{
                    id:currentData.id
                },
                data:{
                    bookingDate:currentData.bookingDate,
                    
                    userId:currentData.userId,
                    totalAmount:currentData.totalAmount,
                    status :currentData.status,
                    tripId:currentData.tripId,
                    totalCustomer:currentData.totalCustomer

                }
            })
            if(updateData){
                return {
                    status:'Success!',
                    statusCode:201,
                    data:updateData

                }

            }

        }catch(error){
            return {
                status:'Internal Server',
                statusCode: 500
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    createBooking = async (currentData : {
        bookingDate:string,
      
        userId:string,
        totalAmount:number,
        status:boolean,
        tripId:number,
        totalCustomer:number

    })=>{
        try{
            await this.prisma.$connect
            const newData= await this.prisma.booking.create({
                data:{
                    bookingDate:currentData.bookingDate,
                
                    userId:currentData.userId,
                    totalAmount:currentData.totalAmount,
                    status :currentData.status,
                    tripId:currentData.tripId,
                    totalCustomer:currentData.totalCustomer
                }
            })
            if(newData){
                return {
                    status:'Success!',
                    statusCode:201,
                    data:newData

                }
            }

        }catch(error){
            console.log(error)
            return {
                status:'Internal Server',
                statusCode: 500
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    getByUserId=async (userId:string)=>{
        try{
            await this.prisma.$connect
            const result = await this.prisma.booking.findMany({
                where:{
                  userId:userId
                }
            })
            return result && result.length>0 ? {
                     status:"success",
                     statusCode:201,
                     data:result
            }:{
                status:"Not found!",
                statusCode:404
            }


        }catch(error){
            return {
                status:'Internal Server',
                statusCode:500
            }
        }
    }
   
}

export const bookingService =new BookingService()