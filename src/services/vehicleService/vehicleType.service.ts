import { PrismaClient, VehicleName ,Vehicle} from "@prisma/client";

class VehicleType {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.vehicle.count();
      const allData = await this.prisma.vehicle.findMany({
        skip: startIndex,
        take: pageSize,
      });
      return {
        status: "Success",
        statusCode: 201,
        data: allData,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
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
  getByName = async (vehicleName: VehicleName) => {
    try {
      const allData = await this.prisma.vehicle.findMany();
      const rs = allData.filter((item:Vehicle)=>item.vehicleName.includes(vehicleName))
      return rs &&rs.length> 0 ?{
        status: "Success",
        statusCode: 201,
        data: rs,
      }:{
        status:'Not found',
        statusCode:404
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
  getById = async (id: number) => {
    try {
      const allData = await this.prisma.vehicle.findFirst({
        where: {
          id: id,
        },
      });
      return {
        status: "Success",
        statusCode: 200,
        data: allData,
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
  deleteById = async (id: number) => {
    try {
      await this.prisma.vehicle.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete Success",
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
  createNew = async (currentData: Vehicle) => {
    try {
      const data = await this.prisma.vehicle.create({
        data: {
          vehicleName: currentData.vehicleName,
          capacity: currentData.capacity,
          status: currentData.status,
          image:currentData.image
          
        },
      });
      if (!data) {
        return {
          status: "Not found",
          statusCode: 404,
          
        };
      }
      if (data) {
        return {
          status: " Success",
          statusCode: 201,
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
  updateNew = async (currentData: Vehicle) => {
    try {
      const data = await this.prisma.vehicle.update({
        data: {
          vehicleName: currentData.vehicleName,
          capacity: currentData.capacity,
          status: currentData.status,
          image:currentData.image
        },
        where: {
          id: currentData.id,
        },
      });
      if (!data) {
        return {
          status: "Success",
          statusCode: 404,
          
        };
      }
      if (data) {
        return {
          status: " Success",
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
}
export const vehicleTypeService = new VehicleType();
