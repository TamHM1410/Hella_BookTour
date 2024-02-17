import { PrismaClient,VehicleName } from "@prisma/client";
class VehicleType {
    private prisma = new PrismaClient();
    constructor() {
      this.prisma = new PrismaClient();
    }
    getAll= async () => {
        try {
          const allData = await this.prisma.vehicle.findMany();
          return {
               status:'Success',
               statusCode:201,
               data:allData
          }
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };
      getByName = async (vehicalName:VehicleName) => {
        try {
          const allData = await this.prisma.vehicle.findFirst({
            where :{
                vehicleName:vehicalName
            }
          });
          return {
               status:'Success',
               statusCode:201,
               data:allData
          }
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };
      getById = async (id:number) => {
        try {
          const allData = await this.prisma.vehicle.findFirst({
            where :{
                id:id
            }
          });
          return {
               status:'Success',
               statusCode:201,
               data:allData
          }
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };
      deleteById = async (id:number) => {
        try {
           await this.prisma.vehicle.delete({
            where :{
                id:id
            }
          });
          return {
               status:'Delete Success',
               statusCode:201,
              
          }
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };
      createNew  = async (currentData :{
        vehicleName:VehicleName,
        capacity:string,
        status:boolean
      }) => {
        try {
          const data= await this.prisma.vehicle.create({
            data :{
                vehicleName:currentData.vehicleName,
                capacity:currentData.capacity,
                status:currentData.status

            }
          });
          if(data){
            return {
                status:' Success',
                statusCode:201,
                data:data
               
           }

          }
         
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };
      updateNew  = async (currentData :{
        vehicleName:VehicleName,
        capacity:string,
        status:boolean,
        id:number
      }) => {
        try {
          const data= await this.prisma.vehicle.update({
            data :{
                vehicleName:currentData.vehicleName,
                capacity:currentData.capacity,
                status:currentData.status

            },
            where:{
                id:currentData.id
            }
          });
          if(data){
            return {
                status:' Success',
                statusCode:201,
                data:data
               
           }

          }
         
        } catch (error) {
          return {
            status:'Internal server error',
            statusCode:500
          }
        } finally {
          await this.prisma.$disconnect;
        }
      };

}
export const vehicleTypeService =new VehicleType()