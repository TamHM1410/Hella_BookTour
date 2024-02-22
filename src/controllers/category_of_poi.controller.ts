import { categoty } from "../services/Categoty_Of_POI/categoty_of_poi";
import { Request, Response } from "express";
class CategotyController {
  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await categoty.getAll(page, pageSize);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const result = await categoty.getById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
  getByName = async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const result = await categoty.getByName(name);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
  deleteById = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const result = await categoty.deleteById(id);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await categoty.createNew(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
  updateById = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const result = await categoty.updateById(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        stutus: "Bad request!",
        statusCode: 500,
      });
    }
  };
}
export const categotyController = new CategotyController();
