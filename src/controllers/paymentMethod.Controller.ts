import { paymentMethodService } from "../services/paymentMethod_Service/payment_MethodService";
import { Request, Response } from "express";

class PaymentMethodController {
  getAllPaymentMethod = async (req: Request, res: Response) => {
    const result = await paymentMethodService.getAllPaymentMethod();
    console.log("result", result);
    return res.status(200).json(result);
  };

  createNewPaymentMethod = async (req: Request, res: Response) => {
    const paymentMethodData = req.body;
    const result = await paymentMethodService.createNewPaymentMethod(
      paymentMethodData
    );
    const status = result?.status;
    if (status === "Error") {
      return res.status(409).json(result);
    }
    return res.status(200).json(result);
  };

  updatePaymentMethod = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        id: number;
        paymentType: string;
        note: string;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date;
      };
      const result = await paymentMethodService.editPaymentMethod(currentData);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getCurrentPaymentMethod = async (req: Request, res: Response) => {
    const paymentMethodId = req.body.id;
    const result = await paymentMethodService.getCurrentPaymentMethod(
      paymentMethodId
    );
    return res.status(200).json(result);
  };

  deletePaymentMethod = async (req: Request, res: Response) => {
    try {
      const paymentMethodId = req.body.id;
      const result = await paymentMethodService.deletePaymentMethod(
        paymentMethodId
      );
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}

export const paymentMethodController = new PaymentMethodController();
