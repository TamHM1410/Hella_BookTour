import { pointOfInterestService } from "../services/point_Of_InterestService/pointOfInterest.service";
import { Request, Response } from "express";

class PointOfInterestController {
  getPointOfInterest = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await pointOfInterestService.getAll(page, pageSize);
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

  getPointOfInterestById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id as number;
      const result = await pointOfInterestService.getById(id);
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

  creatNewPointOfInterest = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        POIName: string;
        POIDescription: string;
        locationId: number;
        categoryPOI_ID: number;
        status: boolean;
      };
      const result = await pointOfInterestService.createNewPointOfInterest(
        currentData
      );
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

  updatePointOfInterestById = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        POIName: string;
        POIDescription: string;
        locationId: number;
        categoryPOI_ID: number;
        status: boolean;
        id: number;
      };
      const result = await pointOfInterestService.updateById(currentData);
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

  deletePointOfInterestById = async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id;
      const id = +paramId;
      const result = await pointOfInterestService.deleteById(id);
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
export const point_Of_InterestController = new PointOfInterestController();
