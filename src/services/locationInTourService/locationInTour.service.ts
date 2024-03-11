import { PrismaClient } from "@prisma/client";
class LocationInTourService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.location_In_Tour.count();
      const result = await this.prisma.location_In_Tour.findMany({
        skip: startIndex,
        take: pageSize,
      });
      if (result) {
        return {
          status: "Success!ok",
          statusCode: 200,
          data: result,
          page,
          pageSize,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
        };
      }
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.location_In_Tour.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          status: "Success!ok",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createNewLocationInTour = async (currentData: {
   
    duration: string;
    status: boolean;
    description: string;
    startCity: string;
    endCity: string;
  }, locationId: number,
  tourId: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.location_In_Tour.create({
        data: {
          locationId: locationId,
          tourId: tourId,
          duration: currentData.duration,
          status: currentData.status,
          description: currentData.description,
          startCity: currentData.startCity,
          endCity: currentData.endCity,
        },
      });
      if (data) {
        return {
          status: "Success!ok",
          statusCode: 201,
          data: data,
        };
      }
    } catch (error) {
      console.log(error)
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.location_In_Tour.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete success!",
        statusCode: 204,
      };
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  updateById = async (currentData: {
    locationId: number;
    tourId: number;
    duration: string;
    status: boolean;
    description: string;
    startCity: string;
    endCity: string;
    id: number;
  }) => {
    try {
      await this.prisma.$connect;
      const dataUpdate = await this.prisma.location_In_Tour.update({
        where: {
          id: currentData.id,
        },
        data: {
          locationId: currentData.locationId,
          tourId: currentData.tourId,
          duration: currentData.duration,
          status: currentData.status,
          startCity: currentData.startCity,
          endCity: currentData.endCity,
          description: currentData.description,
        },
      });
      if (dataUpdate) {
        return {
          status: "Success!",
          statusCode: 201,
          data: dataUpdate,
        };
      }
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getLocationInTour =async (tourId:number)=>{
    try{
      await this.prisma.$connect
      const locationInTour =await this.prisma.location_In_Tour.findMany({
        where :{
          tourId: tourId
        }
      })
      return locationInTour ? {
        status:'Success',
        statusCode:200,
        data:locationInTour
      }:{
        status:'Not found!',
        statusCode:404
      }

    }catch(error){
      return {
        status: "Internal server error",
        statusCode: 500,
      };

    }
  }
  
}
export const locationInTourService = new LocationInTourService();
