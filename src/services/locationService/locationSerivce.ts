import { PrismaClient } from "@prisma/client";
import { upLoadFiles,deleteFolder } from "../uploadFile/upload.service";

class LocationService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAllLocation = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      if(page ==0){
        const data = await this.prisma.location.findMany();
        return{
          status: "Success",
          statusCode: 201,
          data: data
        
        }
      }
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.location.count();
      const data = await this.prisma.location.findMany({
        skip: startIndex,
        take: pageSize,
      });
      return {
        status: "Success",
        statusCode: 201,
        data: data,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
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
  createLocation = async (data: {
    cityId: number;
    locationName: string;
    locationAddress: string;
    status: boolean;
  }) => {
    try {
      await this.prisma.$connect;
      const newLocation = await this.prisma.location.create({
        data: {
          cityId: data.cityId,

          locationName: data.locationName,
          locationAddress: data.locationAddress,
          status: data.status,
        },
      });
      return {
        status: "Create successfully",
        statusCode: 200,
        data: newLocation,
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
  getLocationByLocationName = async (LocationName: string) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.location.findMany();
      const rs =data.filter(item=>item.locationName.includes(LocationName))
      return rs? {
        status: "Success",
        statusCode: 201,
        data: rs,
      }:{
        status:'Not found',
        statusCode:404
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
  getLocationByAddress = async (LocationAddress: string) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.location.findFirst({
        where: {
          locationAddress: LocationAddress,
        },
      });
      return {
        status: "Success",
        statusCode: 200,
        data: data,
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
  updateLocationById = async (currentData: {
    id: number;
    cityId: number;
    locationName: string;
    locationAddress: string;
    status: boolean;
    image:string
  },files :any[]) => {
    try {
      await this.prisma.$connect;
     if(files.length==0){
      const data = await this.prisma.location.update({
        where: {
          id: currentData.id,
        },
        data: {
          cityId: currentData.cityId,
          locationName: currentData.locationName,
          locationAddress: currentData.locationAddress,
          status: currentData.status,
        
        },
      });
      return {
        status: "Update success",
        statusCode: 201,
        data:data
        
      };

     }
 
      const folderName =`Location/${currentData.id}`
      
      const  rs =await upLoadFiles(files,folderName)
      const data = await this.prisma.location.update({
        where: {
          id: currentData.id,
        },
        data: {
          cityId: currentData.cityId,
          locationName: currentData.locationName,
          locationAddress: currentData.locationAddress,
          status: currentData.status,
          image: rs[0].thumb_url
        
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
  deleteLocationById = async (currentId: number) => {
    try {
      await this.prisma.$connect;
      const folderName=`Location/${currentId}`
      console.log('foldername',folderName)
      await deleteFolder(folderName)
      await this.prisma.location.delete({
        where: {
          id: currentId,
        },
      });
      return {
        status: "Delete success !",
        statusCode: 200,
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
  getLocationById =async (id:number)=>{
    try{
      await this.prisma.$connect
      const data =await this.prisma.location.findFirst({
        where:{
          id:id
        }
      })
      return data ? {
        status:'Success',
        statusCode:201,
        data:data
      }:{
        status:'Not found',
        statusCode:404
      }

    }catch(error){
      return {
        status: "Internal Server Error",
        statusCode: 501,

      }
    }
  }
}
export const locationService = new LocationService();
