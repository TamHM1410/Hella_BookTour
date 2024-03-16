import { scheduleService } from "../services/scheduleService/schedule.service";
import { Response, Request } from "express";

class ScheduleController {
  getScheduleByTourGuide = async (req: Request, res: Response) => {
    try {
      const tourGuideId = req.params.tourGuideId;
      const result = await scheduleService.getSchedule(tourGuideId);
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

export const scheduleController = new ScheduleController();
