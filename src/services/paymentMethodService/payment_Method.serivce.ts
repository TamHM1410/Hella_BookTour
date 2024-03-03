import { PrismaClient, PaymentType } from "@prisma/client";
class PaymentMethod {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.payment_Method.count();
      const data = await this.prisma.payment_Method.findMany({
        skip: startIndex,
        take: pageSize,
      });
      console.log(data)
      if (data &&data.length>0) {
        return {
          status: "Success",
          statusCode: 200,
          data: data,
          page,
          pageSize,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
        };
      }else{
        return {
          status:'Not found!',
          statusCode:404
        }
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
  getByPaymentType = async (paymentType: PaymentType) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.payment_Method.findMany({
        where: {
          paymentType: paymentType,
        },
      });
      return data && data.length>0 ? {
        status: "Success",
        statusCode: 200,
        data: data,
      } :{
        status:'Not found',
        statusCode:404
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
      const data = await this.prisma.payment_Method.findFirst({
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
      await this.prisma.payment_Method.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete success",
        statusCode: 204,
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
  createNew = async (currentData: {
    paymentType: PaymentType;
    bankDetails: string;
    note: string;
  }) => {
    try {
      const data = await this.prisma.payment_Method.create({
        data: {
          paymentType: currentData.paymentType,
          note: currentData.note,
          bankDetails: currentData.bankDetails,
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
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  updatePayment = async (currentData: {
    paymentType: PaymentType;
    bankDetails: string;
    note: string;
    id: number;
  }) => {
    try {
      const data = await this.prisma.payment_Method.create({
        data: {
          paymentType: currentData.paymentType,
          note: currentData.note,
          bankDetails: currentData.bankDetails,
          id: currentData.id,
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
        status: "Internal Server",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const paymentMethod = new PaymentMethod();
