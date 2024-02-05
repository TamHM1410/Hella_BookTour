import express from 'express'
import { locationInTourController } from '../../controllers/locationInTour.controller'

export const locationInTourRouter=express.Router()


locationInTourRouter.get('/locationInTours',locationInTourController.getAll)

locationInTourRouter.get('/locationInTours:id',locationInTourController.getById)

locationInTourRouter.delete('/locationInTours:id',locationInTourController.deleteById)

locationInTourRouter.post('/locationInTours',locationInTourController.createNew)

locationInTourRouter.post('/locationInTours/:id',locationInTourController.updateById)


