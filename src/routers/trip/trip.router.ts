import express from 'express'
import { tripController } from '../../controllers/trip.controller'

export const tripRouter=express.Router()

tripRouter.get('/trips',tripController.getAll)

tripRouter.get('/trips/:id',tripController.getTripById)

tripRouter.delete('/trips:id',tripController.deleteTripById)

tripRouter.post('/trips',tripController.createTrip)

tripRouter.patch('/trips/:id',tripController.updateTrip)