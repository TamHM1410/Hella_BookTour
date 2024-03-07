import { Request, Response } from "express";
import tourguideService from "../services/tourguide/tourguide.service";
import { instanceMongo } from "../dbs/MongoDB/instanceMongo";
class TourguideController {
  createTourguide = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await tourguideService.createTourguide(currentData);
      return result
        ? res.status(result.statusCode).json(result)
        : res.status(404).json({
            status: "Not found user id",
            statusCode: 404,
          });
    } catch (error) {
      return res.status(500).json({
        status: "internal server",
        statusCode: 500,
        EM: error,
      });
    }
  };
  getAllTourguide = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const result = await tourguideService.getAllTourguide(page, pageSize);
      return result
        ? res.status(result.statusCode).json(result)
        : res.status(404).json({
            status: "Not found user id",
            statusCode: 404,
          });
    } catch (error) {
      return res.status(500).json({
        status: "internal server",
        statusCode: 500,
        EM: error,
      });
    }
  };
  getTourguideById = async (req: Request, res: Response) => {
    try {
      const tourguideId = req.params.id;
      if (!tourguideId) {
        return res.status(409).json({
          status: "Tourguide id is required",
          statusCode: 409,
        });
      }
      const result = await tourguideService.getTourguideById(tourguideId);
      return result
        ? res.status(result.statusCode).json(result)
        : res.status(404).json({
            status: "Not found user id",
            statusCode: 404,
          });
    } catch (error) {
      return res.status(500).json({
        status: "internal server",
        statusCode: 500,
        EM: error,
      });
    }
  };
  updateTourguide = async (req: Request, res: Response) => {
    try {
      await instanceMongo();
      const id = req.params.id;

      const language = req.body.language;
      const status = req.body.status;
      console.log(id, req.body);
      if (!id || !language) {
        return res.status(409).json({
          status: "Missing body",
          statusCode: 409,
        });
      }
      const result = await tourguideService.updateTourguideById(
        status,
        id,
        language
      );

      return result
        ? res.status(result.statusCode).json(result)
        : res.status(404).json({
            status: "Not found user id",
            statusCode: 404,
          });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "internal server",
        statusCode: 500,
        EM: error,
      });
    }
  };
  deleteTourguide = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(409).json({
          status: "missing",
          statusCode: 409,
        });
      }
      const result = await tourguideService.softDeleteTourguide(id);
      return result
        ? res.status(result.statusCode).json(result)
        : res.status(404).json({
            status: "Not found user id",
            statusCode: 404,
          });
    } catch (error) {
      return res.status(500).json({
        status: "internal server",
        statusCode: 500,
        EM: error,
      });
    }
  };
}
const tourguideController = new TourguideController();
export default tourguideController;
