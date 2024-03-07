import { vehicleTypeService } from "../services/vehicleService/vehicleType.service";
import { Request, Response } from "express";
import { VehicleName } from "@prisma/client";
class VehicleController {
  getAll = async (req: Request, res: Response) => {
    try {
      // Lấy các tham số truyền vào từ query string
      const vehicleName =req.query.vehicleName as VehicleName
      if(vehicleName){
        const result = await vehicleTypeService.getByName(vehicleName);
        if (result) {
          return res.status(result.statusCode).json(result);
        }

      }
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const result = await vehicleTypeService.getAll(page, pageSize);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
     
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  getByName = async (req: Request, res: Response) => {
    try {
      const vehicleName = req.body.vehicleName;
      const result = await vehicleTypeService.getByName(vehicleName);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const result = await vehicleTypeService.getById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  deleteById = async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id;
      const id = +paramId;
      const result = await vehicleTypeService.deleteById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await vehicleTypeService.createNew(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await vehicleTypeService.updateNew(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
}
export const vehicleController = new VehicleController();
