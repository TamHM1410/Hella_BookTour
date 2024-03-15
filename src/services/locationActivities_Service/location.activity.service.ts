import { PrismaClient } from "@prisma/client";

class Location_Activity_Service {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect();
      if(page==0){
        const allData = await this.prisma.location_Activity.findMany({
          orderBy:{
            createAt:'desc'
          }
        });
        return {
          status:'success',
          statusCode:201,
          data:allData
        }

      }
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.location_Activity.count();
      const allData = await this.prisma.location_Activity.findMany({
        skip: startIndex,
        take: pageSize,
        orderBy:{
          createAt:'desc'
        }
      } ,);
      return {
        status: "Success !",
        statusCode: 200,
        data: allData,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      };
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  };
  getLoctionActivityByName = async (activityName: string) => {
    try {
      await this.prisma.$connect();
      const data = await this.prisma.location_Activity.findMany({
        where: {
          activityName: activityName,
        },
      });
      return  data && data.length >0 ?{
        status:'Success',
        statusCode:200,
        data:data
      }:{  status:'Not found!',
            statusCode:404}
       

  
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  };
  getByLocationId =async(locationId:number)=>{
    try{
      await this.prisma.$connect
      const rs =await this.prisma.location_Activity.findMany({
        where:{
          locationId:locationId
        }
      })
     
      return  rs && rs.length >0 ? {
        status:'Success',
        statusCode:200,
        data:rs

      }:{
        status:'Not found',
        statusCode:404,

      }

    }catch(error){
      return {
        status:'Internal server',
        statusCode:500,
        EM:error
      }
    }
  }
  getActivityById =async (activity_id :number)=>{
      try{
          await this.prisma.$connect()
          const data = await this.prisma.location_Activity.findUnique({
              where :{
                  id:activity_id
              }
          })
          if(data){
              return {
                  status:'SUCCESS',
                  satusCode:200,
                  data:data
              }
          }else {
             return {status:'Not found !',
                     statusCod:404
            
            }
          }
         

      }catch(error){
          return {
              status :'Error',
              statusCode :500,
              Message: 'Internal Internal Server'

          }

      }finally{
          await this.prisma.$disconnect()
      }
  }
  deleteLocationActivityById = async (id: number) => {
    try {
      await this.prisma.$connect();
      await this.prisma.location_Activity.delete({
        where: {
          id: id,
        },
      });

      return {
        StatusCode: 204,
        status: "Delete successfully!"
      };
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  };
  updateActivity = async (activityData: {
    id: number;
    locationId: number;
    activityName: string;
    activityDescription: string;
    status: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }) => {
    try {
      await this.prisma.$connect();
      const data = await this.prisma.location_Activity.update({
        where: {
          id: activityData.id,
        },
        data: {
          locationId: activityData.locationId,
          activityName: activityData.activityName,
          activityDescription: activityData.activityDescription,
          status: activityData.status,
          updateAt: new Date(),
        },
      });
      return {
        statusCode: 200,
        status: "Update successfully",
        data: data,
      };
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  };
  deleteActivity = async (id: number) => {
    try {
      await this.prisma.$connect();
      if(id=== null|| id===undefined){
        return {
          statusCode: 404,
          status: "Resource not found!",
        };

      }
      await this.prisma.location_Activity.delete({
        where: {
          id: id, // Make sure 'id' is defined and passed correctly
        },
      });
      return {
        statusCode: 204,
        status: "Delete location activity successfully!",
      };
    } catch (error) {
      console.log(error);
      // Handle the error appropriately (e.g., throw or return an error response)
      return {
        statusCode: 500,
        status: "Internal Server Error",
      };
    } finally {
      await this.prisma.$disconnect();
    }
  };
  createActivity = async (data: {
    locationId: number;
    activityName: string;
    activityDuration: string;
    activityDescription: string;
    status: boolean;
  }) => {
    try {
      await this.prisma.$connect();
      const createNewActivity = await this.prisma.location_Activity.create({
        data: {
          locationId: data.locationId,
          activityName: data.activityName,
          activityDuration: data.activityDuration,
          activityDescription: data.activityDescription,
          status: data.status,
        },
      });
      return {
        status: "Success",
        statusCode: 201,
        createNewActivity,
      };
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  };
}
export const location_activity_service = new Location_Activity_Service();
