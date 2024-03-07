import { PrismaClient } from "@prisma/client";

class CityService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  getCity = async (page: number, pageSize: number) => {
    try {
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.city.count();
      const allCity = await this.prisma.city.findMany({
        skip: startIndex,
        take: pageSize,
      });
      return {
        status: "Success!",
        statusCode: 200,
        data: allCity,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  };
  getCityByName =async(cityName:string)=>{
    try{
      const data = await this.prisma.city.findMany()
      const rs =await data.filter(item=>item.cityName.includes(cityName))
      return data ? { 
        status :'Success',
        statusCode:201,
        data:rs
      
      }:{
        status:'Not found',
        statusCode:404
      }


    }catch(error){
      console.log(error)
    }
  }
  createNewCity = async (cityData: {
    cityName: string;
    country: string;
    status: boolean;
  }) => {
    try {
      // console.log("city", cityData.cityName);

      const existCity = await this.prisma.city.findFirst({
        where: {
          cityName: cityData.cityName,
        },
      });
      if (existCity) {
        return {
          status: "Existing City",
          statusCode:409
         
        };
      }

      const newCity = await this.prisma.city.create({
        data: {
          cityName: cityData?.cityName,
          country: cityData?.country,
          status: cityData?.status,
          createAt: new Date(),
        },
      });
      return {
        status: "Success",
        statusCode:201,
        data: newCity,
      };
    } catch (error) {
      console.log(error);
    }
  };
  getCurrentCity = async (cityId: number) => {
    try {
      const currentCity = await this.prisma.city.findUnique({
        where: {
          id: cityId,
        },
      });
      return currentCity
        ? { status: "success!", statusCode: 200, data: currentCity }
        : { status: "City not exist!", statusCode: 409 };
    } catch (error) {
      console.log(error);
    }
  };
  editCity = async (currentData: {
    id: number;
    cityName: string;
    country: string;
    status: boolean;
  }) => {
    try {
     const data= await this.prisma.city.update({
        where: {
          id: currentData.id,
        },
        data: {
          cityName: currentData.cityName,
          country: currentData.country,
          status: currentData.status,
        },
      });
      if(!data){
        return {
          status:'Some thing wrong',
          statusCode: 409
        }
      }

      return {
        status: "Update successfully!",
        statusCode:201,
        data:data
        
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update city");
    }
  };
  deleteCity = async (cityId: number) => {
    try {
      console.log("cityId", cityId);
      await this.prisma.city.delete({
        where: {
          id: cityId,
        },
      });
      return {
        status: "Success",
        statusCode: 204,
        message: "delete successfully!",
      };
    } catch (error) {
      console.log(error);
    }
  };
}

export const cityService = new CityService();
