import { vehicleService } from "../services/vehicleService/vehicleService";
import { Request, Response } from "express";

class VehicleController {
  getAllVehicle = async (req: Request, res: Response) => {
    const result = await vehicleService.getVehicle();
    console.log("result", result);
    return res.status(200).json(result);
  };

  createNewVehicle = async (req: Request, res: Response) => {
    const vehicleData = req.body;
    const result = await vehicleService.createNewVehicle(vehicleData);
    const status = result?.status;
    if (status === "Error") {
      return res.status(409).json(result);
    }
    return res.status(200).json(result);
  };

  updateVehicle = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        id: number;
        vehicleName: string;
        status: boolean;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date;
      };
      const result = await vehicleService.editVehicle(currentData);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getCurrentVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.body.id;
    const result = await vehicleService.getCurrentVehicle(vehicleId);
    return res.status(200).json(result);
  };

  deleteCurrentVehicle = async (req: Request, res: Response) => {
    try {
      const vehicleId = req.body.id;
      const result = await vehicleService.deleteVehicle(vehicleId);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}

export const vehicleController = new VehicleController();
