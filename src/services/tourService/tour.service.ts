import { PrismaClient, TourType } from "@prisma/client";
import { upLoadFiles,deleteFolder } from "../uploadFile/upload.service";
class TourService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  update = async (currentData: {
    tourName: string;
    status: boolean;
    price: number;
    vehicleTypeId: number;
    tourType: string;
    id: number;
    image:string
  },files:any[]) => {
    try {
      await this.prisma.$connect;
      if(files.length == 0){
        const data = await this.prisma.tour.update({
          where: {
            id: currentData.id,
          },
          data: {
            tourName: currentData.tourName,
            status: currentData.status,
            price: currentData.price,
            vehicleTypeId: currentData.vehicleTypeId,
            image:currentData.image
          },
        });
        if (data) {
          return {
            status: "Success",
            statusCode: 200,
          };
        }

      }
      const folderName =`Tour/${currentData.id}`
      const  rs =await upLoadFiles(files,folderName)
      const data = await this.prisma.tour.update({
        where: {
          id: currentData.id,
        },
        data: {
          tourName: currentData.tourName,
          status: currentData.status,
          price: currentData.price,
          vehicleTypeId: currentData.vehicleTypeId,
          image:rs[0].thumb_url
        },
      });
      return {
        status: "Update success",
        statusCode: 201,
        data:data
       
        
      }


      
    } catch (error) {
      console.log(error);
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const folderName=`Tour/${id}`
      await deleteFolder(folderName)
      await this.prisma.location_In_Tour.deleteMany({
        where:{
          tourId:id
        }
      })
      await this.prisma.location_In_Tour.deleteMany({
        where:{
          tourId:id
        }
      })
      await this.prisma.trip.deleteMany({
        where:{
          tourId:id
        }
      })
      await this.prisma.tour.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete success!",
        statusCode: 204,
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createNewTour = async (currentData: {
    tourName: string;
    status: boolean;
    price: number;
    vehicleTypeId: number;
    tourType: TourType;
  }) => {
    try {
      await this.prisma.$connect;
      const newTour = await this.prisma.tour.create({
        data: {
          tourName: currentData.tourName,
          status: currentData.status,
          price: currentData.price,
          vehicleTypeId: currentData.vehicleTypeId,
          tourType: currentData.tourType,
        },
      });
      if (newTour) {
        return {
          status: "Success",
          statusCode: 201,
          data: newTour,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getTourByTourType = async (tourType: TourType) => {
    try {
      console.log(tourType,'tour type')
      await this.prisma.$connect;
      const data = await this.prisma.tour.findMany();
      const rs=data.filter(item=>item.tourType.toLowerCase().includes(tourType.toLowerCase()))
      return rs &&rs.length >0 ?  {
          status: "Success",
          statusCode: 201,
          data: rs,
        }: {
          status: "Not found",
          statusCode: 201,
        
        }

     
    } catch (error) {
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  getTourById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.tour.findFirst({
        where: {
          id: id,
        },
      });
      if (!data) {
        return {
          status: "Not found ",
          statusCode: 404,
        };
      }
      if (data) {
        return {
          status: "Success",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getByTourName = async (tourName: string) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.tour.findMany();
      const rs= data.filter(item=>item.tourName.toLowerCase().includes(tourName.toLowerCase()))
      console.log(rs.length,'rs')
      return rs &&rs.length > 0 ? {
        status: "Success",
          statusCode: 201,
          data: rs
      }:{
          status: "Not found",
          statusCode: 404,
      }
      
    } catch (error) {
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      if(page==0){
        const data = await this.prisma.tour.findMany({
          orderBy:{
            createAt:'desc'
          }
        })
        return {
          status: "success",
          statusCode: 201,
          data:data
        };
      }
      const startIndex = (page - 1) * pageSize;
      const totalItems = await this.prisma.tour.count();
      const data = await this.prisma.tour.findMany({
        skip: startIndex,
        take: pageSize,
        orderBy:{
          createAt:'desc'
        }
      });
      if (!data) {
        return {
          status: "Not found",
          statusCode: 404,
        };
      }
      if (data) {
        return {
          status: "Success",
          statusCode: 200,
          data: data,
          page,
          pageSize,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "Internal Server Error",
        statusCode: 501,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const tourService = new TourService();
