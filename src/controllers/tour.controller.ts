import { tourService } from "../services/tourService/tour.service";
import { Request, Response } from "express";
import {  TourType } from "@prisma/client";
class TourController {
  getAll = async (req: Request, res: Response) => {
    try {
      const tourName =req.query.tourName as string 
      const tourType= req.query.tourType as TourType
      const page = parseInt(req.query.page as string) || 0;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      if(tourName){
        const result = await tourService.getByTourName(tourName);
        if (result) {
          return res.status(result.statusCode).json(result);
        }
      }
      if(tourType){
        const result = await tourService.getTourByTourType(tourType);
        if (result) {
          return res.status(result.statusCode).json(result);
        }
      }
      const result = await tourService.getAll(page, pageSize);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  updateTour = async (req: Request, res: Response) => {
    try {
      const currentata = req.body;

      const result = await tourService.update(currentata);
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
      const id = +req.params.id;
      const result = await tourService.getTourById(id);
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
      const tourName = req.body.tourName;
      const result = await tourService.getByTourName(tourName);
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
      const result = await tourService.deleteById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
  getByTourType = async (req: Request, res: Response) => {
    try {
      const tourType = req.body.tourType;
      const result = await tourService.getTourByTourType(tourType);
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
  createNewTour = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await tourService.createNewTour(currentData);
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
export const tourController = new TourController();
