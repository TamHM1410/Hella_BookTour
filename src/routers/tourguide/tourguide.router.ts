import express from 'express'
import tourguideController from '../../controllers/tourguide.controller'
export const tourguideRouter =express.Router()

tourguideRouter.get('/tourguides',tourguideController.getAllTourguide)
tourguideRouter.post('/tourguides',tourguideController.createTourguide)
tourguideRouter.patch('/tourguides/:id',tourguideController.updateTourguide)
tourguideRouter.get('/tourguides/:id',tourguideController.getTourguideById)
tourguideRouter.delete('/tourguides/:id',tourguideController.deleteTourguide)
