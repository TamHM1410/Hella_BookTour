import { tripService } from "./../services/trip/trip.service";

import { Request, Response } from "express";
class TripController {
  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await tripService.getAllTrip(page, pageSize);
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
  getTripById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const result = await tripService.getTripById(id);

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
  deleteTripById = async (req: Request, res: Response) => {
    try {
      const paramId = req.params.id;
      const id = +paramId;
      const result = await tripService.deleteTripById(id);
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
  createTrip = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        tourId: number;
        totalCustomer: number;
        startDate: string;
        endDate: string;
        status: boolean;
        tourGuideId: number;
      };
      const result = await tripService.createNewTrip(currentData);
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
  updateTrip = async (req: Request, res: Response) => {
    try {
      const currentData = req.body as {
        tourId: number;
        totalCustomer: number;
        startDate: string;
        endDate: string;
        status: boolean;
        tourGuideId: number;
        id: number;
      };
      const result = await tripService.updateTrip(currentData);
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
export const tripController = new TripController();
