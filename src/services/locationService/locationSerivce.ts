import { PrismaClient } from "@prisma/client";
class LocationService{
    private prisma= new PrismaClient()
    constructor(){
        this.prisma = new PrismaClient();
    }
    getAllLocation =async ()=>{
        try{
            await this.prisma.$connect
            const data = await this.prisma.location.findMany()
            return {
                status:'Success',
                statusCode :202,
                data:data
            }

        }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }
        }finally{
           await this.prisma.$disconnect
        }
    }
    createLocation =async (data:{
          cityId:number,
          locationName:string,
          locationAddress:string,
          status: boolean
    })=>{
        try{
            await this.prisma.$connect
            const newLocation= await this.prisma.location.create({
                data:{
                    cityId: data.cityId,
                    locationName:data.locationName,
                    locationAdress:data.locationAddress,
                    status:data.status

                }
            })
            return {
                  status:'Create successfully',
                  statusCode:200,
                  data:newLocation

            }


        }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }
        }finally{
            await this.prisma.$disconnect
        }
    }
    getLocationByLocationName =async(LocationName:string)=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.location.findFirst({
                where :{
                    locationName:LocationName

                }
            })
            return {
                status:'Success',
                statusCode:200,
                data:data

          }


        }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }
        }finally{
            await this.prisma.$disconnect
        }

    }
    getLocationByAddress =async(LocationAddress:string)=>{
        try{
            await this.prisma.$connect
            const data =await this.prisma.location.findFirst({
                where :{
                    locationAdress:LocationAddress

                }
            })
            return {
                status:'Success',
                statusCode:200,
                data:data

          }

       }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }
        }finally{
            await this.prisma.$disconnect
        }

    }
    updateLocationById =async(currentData:{
        id:number,
        cityId:number,
        locationName:string,
        locationAddress:string,
        status:boolean

    })=>{
        try{
            await this.prisma.$connect
            const data=await this.prisma.location.update({
                where:{
                    id:currentData.id

                },
                data:{
                    cityId: currentData.cityId,
                    locationName:currentData.locationName,
                    locationAdress:currentData.locationAddress,
                    status:currentData.status
                }
            })
            return {
                status:'Update success',
                statusCode:200,
                data:data
            }

        }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }
        }finally{
            await this.prisma.$disconnect
        }
    }
    deleteLocationById =async (currentId:number)=>{
        try{
            await this.prisma.$connect
            await this.prisma.location.delete({
                where :{
                    id:currentId
                }
            })
            return {
                status:'Delete success !',
                statusCode:200,
                
            }

        }catch(error){
            console.log(error)
            return {
                status :'Internal Server Error',
                statusCode:501
            }

        }finally{
            await  this.prisma.$disconnect
        }
    }


}
export const locationService=new LocationService()