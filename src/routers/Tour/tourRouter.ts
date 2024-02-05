import express from 'express'
import { tourController } from '../../controllers/tour.controller'

export const tourRouter=express.Router()

tourRouter.get('/tours',tourController.getAll)

tourRouter.get('/tours/:id',tourController.getById)

tourRouter.get('/tours/tourName',tourController.getByName)

tourRouter.get('/tours/tourType',tourController.getByTourType)


tourRouter.post('/tours',tourController.createNewTour)


tourRouter.delete('/tours/:id',tourController.deleteById)

tourRouter.post('/tour/:id',tourController.updateTour)
