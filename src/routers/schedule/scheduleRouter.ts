import {schedule} from "../../middleware/schedule"
import express from "express";
export const scheduleRouter = express.Router()

scheduleRouter.get('/schedules/:tourGuideId', schedule.getSchedule)