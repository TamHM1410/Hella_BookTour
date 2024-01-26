import express from 'express'
import { locationActivityController } from '../../controllers/location.Activity.controller'
export const locationActivityRouter=express.Router()


locationActivityRouter.get('/location_activity',locationActivityController.getAllLocationActivity)
locationActivityRouter.get('/location_activity/getByActivityName',locationActivityController.getActivityByName)