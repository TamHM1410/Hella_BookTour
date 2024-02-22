import { PrismaClient, TourType } from "@prisma/client";

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
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.tour.update({
        where: {
          id: currentData.id,
        },
        data: {
          tourName: currentData.tourName,
          status: currentData.status,
          price: currentData.price,
          vehicleTypeId: currentData.vehicleTypeId,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
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
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.tour.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
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
      await this.prisma.$connect;
      const data = await this.prisma.tour.findMany({
        where: {
          tourType: tourType,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
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

  getTourById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.tour.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
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
      const data = await this.prisma.tour.findFirst({
        where: {
          tourName: tourName,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
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

  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.tour.count();
      const data = await this.prisma.tour.findMany({
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
