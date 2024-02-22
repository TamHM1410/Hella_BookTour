import { paymentService } from "../services/paymentService/payment.service";
import { Request, Response } from "express";
class Payment {
  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await paymentService.getAll(page, pageSize);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
  deletetById = async (req: Request, res: Response) => {
    try {
      const params = req.params.id;
      const id = +params;
      const result = await paymentService.deleteById(id);

      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
  getPaymentByName = async (req: Request, res: Response) => {
    try {
      const paymentName = req.body.paymentName as string;
      const result = await paymentService.getPaymentByName(paymentName);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
  getPaymentById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id as number;
      const result = await paymentService.getPaymentById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
  createNewPayment = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        paymentDate: string;
        amount: number;
        status: boolean;
        refunded: boolean;
        refundedTime: string;
        refundedAmount: string;
        paymentMethodId: number;
        bookingId: number;
        paymentName: string;
      };
      const result = await paymentService.createNewPayment(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
  updateById = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        paymentDate: string;
        amount: number;
        status: boolean;
        refunded: boolean;
        refundedTime: string;
        refundedAmount: string;
        paymentMethodId: number;
        bookingId: number;
        paymentName: string;
        id: number;
      };
      const result = await paymentService.updatePaymentById(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 500,
      });
    }
  };
}
export const paymentController = new Payment();
