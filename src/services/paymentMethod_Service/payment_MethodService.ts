import { PrismaClient } from "@prisma/client";

class Payment_Method_Service {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllPaymentMethod = async () => {
    try {
      const allData = await this.prisma.payment_Method.findMany();
      return allData;
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect;
    }
  };

  createNewPaymentMethod = async (PaymentMethodData: {
    paymentType: string;
    note: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }) => {
    try {
      console.log("paymentMethod", PaymentMethodData.paymentType);
      const existPaymentMethod = await this.prisma.payment_Method.findFirst({
        where: {
          paymentType: PaymentMethodData.paymentType,
        },
      });
      if (existPaymentMethod) {
        return {
          status: "Error",
          message: "PaymentMethod already Exist",
          data: "null",
        };
      }
      const newPaymentMethod = await this.prisma.payment_Method.create({
        data: {
          paymentType: PaymentMethodData.paymentType,
          note: PaymentMethodData.note,
          createAt: PaymentMethodData?.createAt,
          updateAt: PaymentMethodData?.updateAt,
          deleteAt: PaymentMethodData?.deleteAt,
        },
      });
      return {
        status: "Success",
        message: "Create new paymentMethod success !",
        data: newPaymentMethod,
      };
    } catch (error) {
      console.log(error);
    }
  };

  getCurrentPaymentMethod = async (paymentMethodId: number) => {
    try {
      const currentPaymentMethod = await this.prisma.payment_Method.findUnique({
        where: {
          id: paymentMethodId,
        },
      });
      return currentPaymentMethod;
    } catch (error) {
      console.log(error);
    }
  };

  editPaymentMethod = async (currentData: {
    id: number;
    paymentType: string;
    note: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }) => {
    try {
      await this.prisma.payment_Method.update({
        where: {
          id: currentData.id,
        },
        data: {
          paymentType: currentData.paymentType,
          note: currentData.note,
          updateAt: new Date(),
        },
      });
      return {
        status: "Success",
        message: "Update successfully!",
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update paymentMethod");
    }
  };

  deletePaymentMethod = async (paymentMethodId: number) => {
    try {
      await this.prisma.payment_Method.delete({
        where: {
          id: paymentMethodId,
        },
      });
      return {
        status: "Success",
        message: "Delete successfully!",
      };
    } catch (error) {
      console.log(error);
    }
  };
}

export const paymentMethodService = new Payment_Method_Service();
