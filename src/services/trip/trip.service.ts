import { PrismaClient } from "@prisma/client";
class TripService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  deleteTripById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.trip.delete({
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
        status: "Internal server",
        statusCode: 500,
      };
    }
  };
  getAllTrip = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.trip.count();
      const data = await this.prisma.trip.findMany({
        skip: startIndex,
        take: pageSize,
      });
      return {
        status: "Success !",
        statusCode: 201,
        data: data,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      };
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createNewTrip = async (currentData: {
    tourId: number;
    totalCustomer: number;
    startDate: string;
    endDate: string;
    status: boolean;
    tourGuideId: number;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.trip.create({
        data: {
          tourId: currentData.tourId,
          totalCustomer: currentData.totalCustomer,
          
          status: currentData.status,
          tourGuideId: currentData.tourGuideId,
        },
      });
      if (data) {
        return {
          status: "success",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
      };
    }
  };
  updateTrip = async (currentData: {
    tourId: number;
    totalCustomer: number;
    startDate: string;
    endDate: string;
    status: boolean;
    tourGuideId: number;
    id: number;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.trip.update({
        where: {
          id: currentData.id,
        },
        data: {
          tourId: currentData.tourId,
          totalCustomer: currentData.totalCustomer,
       
          status: currentData.status,
          tourGuideId: currentData.tourGuideId,
        },
      });
      if (data) {
        return {
          status: "internal server",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
      };
    }
  };
  getTripById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.trip.findFirst({
        where: {
          id: id,
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
          status: "Success !",
          statusCode: 200,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const tripService = new TripService();
