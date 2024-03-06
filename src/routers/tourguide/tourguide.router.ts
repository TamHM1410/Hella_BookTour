import express from 'express'
import tourguideController from '../../controllers/tourguide.controller'
export const tourguideRouter =express.Router()

tourguideRouter.get('/tourguides',tourguideController.getAllTourguide)
tourguideRouter.post('/tourguides',tourguideController.createTourguide)
