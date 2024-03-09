import { locationService } from "../services/locationService/locationSerivce";
import { Request, Response } from "express";
class LocationController {
  getAll = async (req: Request, res: Response) => {
    try {
      
      if(req.query.locationName){
        const LocationName =req.query.locationName as string
        const rs =await locationService.getLocationByLocationName(LocationName)
        return rs ? res.status(rs.statusCode).json(rs): res.status(500).json({status:'Internal server',statusCode:500})

      }else if(req.query.locationAddress){
        const LocationAddress = req.query.locationAddress as string
        const rs =await locationService.getLocationByAddress(LocationAddress)
        return rs ? res.status(rs.statusCode).json(rs): res.status(500).json({status:'Internal server',statusCode:500})

      }
      
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const result = await locationService.getAllLocation(page, pageSize);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Error",
        statusCode: 500,
      });
    }
  };
  createLocation = async (req: Request, res: Response) => {
    try {
      const data = req.body as {
        cityId: number;
        locationName: string;
        locationAddress: string;
        status: boolean;
      };
      console.log(data, "s");
      const result = await locationService.createLocation(data);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Error",
        statusCode: 500,
      });
    }
  };
  getLocationByName = async (req: Request, res: Response) => {
    try {
      const LocationName = req.body.locationName;
      const result = await locationService.getLocationByLocationName(
        LocationName
      );
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 666,
      });
    }
  };
  getLocationByAdress = async (req: Request, res: Response) => {
    try {
      const LocationAddress = req.body.locationAddress;
      const result = await locationService.getLocationByAddress(
        LocationAddress
      );
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server",
        statusCode: 666,
      });
    }
  };
  updateLocation = async (req: Request, res: Response) => {
    try {
      const currentData = req.body  ;
      const id = req.params.id;
      console.log("id", id);
      const result = await locationService.updateLocationById(currentData);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error!",
        statusCode: 500,
      });
    }
  };
  deleteLocation = async (req: Request, res: Response) => {
    try {
      const paramsId = req.params.id;
      const currentId: number = +paramsId;
      const result = await locationService.deleteLocationById(currentId);
      if (result) {
        return res.status(result.statusCode).json(result);
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error!",
        statusCode: 500,
      });
    }
  };
  getLocationbyId =async (req:Request,res:Response)=>{
    try{
      const id =+req.params.id
      const result =await locationService.getLocationById(id)
      if (result) {
        return res.status(result.statusCode).json(result);
      }

    }catch(error){
      return res.status(500).json({
        status: "Internal server error!",
        statusCode: 500,
      });

    }
  }
}
export const locationController = new LocationController();
