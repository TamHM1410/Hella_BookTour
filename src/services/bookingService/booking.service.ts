import { PrismaClient } from "@prisma/client";
class BookingService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.booking.count();
      const data = await this.prisma.booking.findMany({
        skip: startIndex,
        take: pageSize,
      });
      if (data) {
        return {
          status: "Success!",
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
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  getById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.booking.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          status: "Success!",
          statusCode: 201,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.booking.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete Success!",
        statusCode: 201,
      };
    } catch (error) {
      return {
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  updatebooking = async (currentData: {
    bookingDate: string;
    fromDate: string;
    toDate: string;
    userId: string;
    totalAmount: number;
    status: boolean;
    tripId: number;
    totalCustomer: number;
    id: number;
  }) => {
    try {
      await this.prisma.$connect;
      const updateData = await this.prisma.booking.update({
        where: {
          id: currentData.id,
        },
        data: {
          bookingDate: currentData.bookingDate,
          fromDate: currentData.fromDate,
          toDate: currentData.toDate,
          userId: currentData.userId,
          totalAmount: currentData.totalAmount,
          status: currentData.status,
          tripId: currentData.tripId,
          totalCustomer: currentData.totalCustomer,
        },
      });
      if (updateData) {
        return {
          status: "Success!",
          statusCode: 201,
          data: updateData,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createBooking = async (currentData: {
    bookingDate: string;
    fromDate: string;
    toDate: string;
    userId: string;
    totalAmount: number;
    status: boolean;
    tripId: number;
    totalCustomer: number;
  }) => {
    try {
      await this.prisma.$connect;
      const newData = await this.prisma.booking.create({
        data: {
          bookingDate: currentData.bookingDate,
          fromDate: currentData.fromDate,
          toDate: currentData.toDate,
          userId: currentData.userId,
          totalAmount: currentData.totalAmount,
          status: currentData.status,
          tripId: currentData.tripId,
          totalCustomer: currentData.totalCustomer,
        },
      });
      if (newData) {
        return {
          status: "Success!",
          statusCode: 201,
          data: newData,
        };
      }
    } catch (error) {
      return {
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const bookingService = new BookingService();
