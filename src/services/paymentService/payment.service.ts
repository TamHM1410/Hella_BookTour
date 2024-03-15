import { PrismaClient } from "@prisma/client";
class PaymentService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
  getPaymentById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.payment.findFirst({
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
  getPaymentByName = async (paymentName: string) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.payment.findFirst({
        where: {
          paymentName: paymentName,
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
  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.payment.delete({
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
        const data = await this.prisma.payment.findMany({
          orderBy:{
            createAt:'desc'
          }
        });
        return {
          status:'Success',
          statusCode:201,
          data:data
        }
      }
      const startIndex = (page - 1) * pageSize;
      // Lấy tổng số lượng mục từ cơ sở dữ liệu
      const totalItems = await this.prisma.payment.count();
      const data = await this.prisma.payment.findMany({
        skip: startIndex,
        take: pageSize,
        orderBy:{
          createAt:'desc'
        }
      });
      return data &&data.length> 0 ? {
        status: "Success",
        statusCode: 201,
        data: data,
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      } :{
        status:'Not Exist',
        statusCode:404
      }
      
      
    } catch (error) {
      console.log(error)
      return {
        status: "Internal Server Error",
        statusCode: 501,
        EM:error
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
  createNewPayment = async (currentData:any) => {
    try {
      await this.prisma.$connect;
   

      return {
        status: "Success",
        statusCode: 201,
      
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
  updatePaymentById = async (currentData: {
    id: number;
    paymentDate: string;
    amount: number;
    status: boolean;
    refunded: boolean;
    refundedTime: string;
    refundedAmount: string;
    paymentMethodId: number;
    bookingId: number;
    paymentName: string;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.payment.update({
        where: {
          id: currentData.id,
        },
        data: {
          paymentDate: currentData.paymentDate,
          amount: currentData.amount,
          status: currentData.status,
          refunded: currentData.refunded,
          refundedTime: currentData.refundedTime,
          refundedAmount: currentData.refundedAmount,
          
          bookingId: currentData.bookingId,
          paymentName: currentData.paymentName,
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
}
export const paymentService = new PaymentService();
