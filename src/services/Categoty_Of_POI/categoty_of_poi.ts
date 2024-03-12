import { PrismaClient } from "@prisma/client";
class Categoty_of_poi {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      if (page ==0 ){
        const data = await this.prisma.categoty_Of_POI.findMany();
        return {
          status: "Success",
          statusCode: 201,
          data: data,
         
 }

      }
      const startIndex = (page - 1) * pageSize;
      
      const totalItems = await this.prisma.categoty_Of_POI.count();
      const data = await this.prisma.categoty_Of_POI.findMany({
        skip:startIndex,
        take:pageSize
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
          data: data,
          page,
          pageSize,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.categoty_Of_POI.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getByName = async (categoryName: string) => {
    try {
      await this.prisma.$connect;
      const allData =await this.prisma.categoty_Of_POI.findMany()
      const rs = allData.filter((item)=>item.categoryName.includes(categoryName))
      
     
      if (rs) {
        return {
          status: "Success",
          statusCode: 201,
          data: rs,
        };
      }else {
        return {
          status:'Not found',
          statusCode:404
        }
      }
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.categoty_Of_POI.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete success",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createNew = async (currentData: {
    categoryName: string;
    status: boolean;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.categoty_Of_POI.create({
        data: {
          categoryName: currentData.categoryName,
          status: currentData.status ||false,
        },
      });
      if (data) {
        return {
          status: " success",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  updateById = async (currentData: {
    categotyName: string;
    status: boolean;
    id: number;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.categoty_Of_POI.update({
        data: {
          categoryName: currentData.categotyName,
          status: currentData.status,
        },
        where: {
          id: currentData.id,
        },
      });
      if (data) {
        return {
          status: "Delete success",
          statusCode: 201,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const categoty = new Categoty_of_poi();
