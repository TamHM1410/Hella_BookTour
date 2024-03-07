import { cityService } from "../services/cityService/city.serivce";
import { Request, Response } from "express";
class CityController {
  getAllCity = async (req: Request, res: Response) => {
    try {

      const cityName =req.query.cityName as string 
      if(cityName){
        const result =await cityService.getCityByName(cityName)
        return result ? res.status(result.statusCode).json(result): res.status(404).json('Not found')
      }
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const result = await cityService.getCity(page, pageSize);
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
  createNewCity = async (req: Request, res: Response) => {
    const cityData = req.body as {
      cityName: string;
      country: string;
      status: boolean;
    };
    const result = await cityService.createNewCity(cityData);
    const status = result?.status;
    if (status === "Error") {
      return res.status(409).json(result);
    }
    return res.status(200).json(result);
  };
  updateCity = async (req: Request, res: Response) => {
    try {
      const currentData = req.body 
      
      const result = await cityService.editCity(currentData);
      if(result){
        return res.status(result.statusCode).json(result)
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  getCurrentCity = async (req: Request, res: Response) => {
    const cityId = req.body.id;

    const result = await cityService.getCurrentCity(cityId);
    return res.status(200).json(result);
  };
  deleteCurrentCity = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const cityId: number = +id;

      const result = await cityService.deleteCity(cityId);
      return result
        ? res.status(result.statusCode).json(result)
        : res.status(401).json({ status: "Can not delete", statusCode: 401 });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}

export const cityController = new CityController();
