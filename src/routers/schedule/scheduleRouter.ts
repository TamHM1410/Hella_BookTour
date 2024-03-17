import {scheduleController} from "../../controllers/schedule.Controller"
import express from "express";
export const scheduleRouter = express.Router()

scheduleRouter.get('/schedules/:tourGuideId', scheduleController.getScheduleByTourGuide)