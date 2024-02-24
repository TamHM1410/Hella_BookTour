import { PrismaClient } from "@prisma/client";
class Categoty_of_poi {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    getAll =async ()=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.categoty_Of_POI.findMany()
            if(data){
                return {
                    status:'Success',
                    statusCode:201,
                    data:data
                }
            }

        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    getById =async (id:number)=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.categoty_Of_POI.findFirst(
                {
                    where :{
                        id:id
                    }
                }
            )
            if(data){
                return {
                    status:'Success',
                    statusCode:201,
                    data:data
                }
            }

        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    getByName =async (name:string)=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.categoty_Of_POI.findFirst(
                {
                    where :{
                        categoryName:name
                    }
                }
            )
            if(data){
                return {
                    status:'Success',
                    statusCode:201,
                    data:data
                }
            }

        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    deleteById =async (id:number)=>{
        try{
            await this.prisma.$connect
            await this.prisma.categoty_Of_POI.delete(
                {
                    where :{
                        id:id
                    }
                }
            )
            return {
                status:'Delete success',
                statusCode:201,
               
            }

        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    createNew =async (currentData :{
        categoryName:string,
        status:boolean,


    })=>{
        try{
            await this.prisma.$connect
            const data=  await this.prisma.categoty_Of_POI.create(
                {
                    data :{
                        categoryName:currentData.categoryName,
                        status:currentData.status
                    }
                }
            )
            if(data){
                return {
                    status:' success',
                    statusCode:201,
                    data:data
                   
                }

            }
            

        }catch(error){
            console.log(error)
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    updateById =async (currentData :{
        categotyName:string,
        status:boolean,
        id:number


    })=>{
        try{
            await this.prisma.$connect
            const data=  await this.prisma.categoty_Of_POI.update(
                {
                    data :{
                        categoryName:currentData.categotyName,
                        status:currentData.status
                    },
                    where:{
                        id:currentData.id
                    }
                }
            )
            if(data){
                return {
                    status:'Delete success',
                    statusCode:201,
                    data:data
                   
                }

            }
            

        }catch(error){
            return {
                status:'Internal Server!',
                statusCode:500,
            }

        }finally {
            await this.prisma.$disconnect
        }
    }
    
    
    



}
export const categoty =new Categoty_of_poi()