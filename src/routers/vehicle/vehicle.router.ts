import { vehicleController } from "../../controllers/vehicleType.controller";
import express from 'express'
export const vehicleRouter=express.Router()


vehicleRouter.get('/vehicles',vehicleController.getAll)

vehicleRouter.get('/vehicles/:id',vehicleController.getById)

vehicleRouter.get('/vehicles/vehicleName',vehicleController.getByName)

vehicleRouter.delete('/vehicles/:id',vehicleController.deleteById)

vehicleRouter.patch('/vehicles/:id',vehicleController.update)

vehicleRouter.post('/vehicles',vehicleController.create)
