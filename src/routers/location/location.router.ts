import express from 'express'
import { locationController } from '../../controllers/location.Controller'

export const locationRouter=express.Router()


locationRouter.get('/locations',locationController.getAll)

locationRouter.post('/locations/',locationController.createLocation)

locationRouter.get('/locations/name',locationController.getLocationByName)

locationRouter.get('/locations/address',locationController.getLocationByAdress)

locationRouter.patch('/locations/:id',locationController.updateLocation)

locationRouter.delete('/locations/:id',locationController.deleteLocation)


