import express from 'express'
import { categotyController } from '../../controllers/category_of_poi.controller'

export const categotyOfPoiRouter=express.Router()


categotyOfPoiRouter.get('/pois',categotyController.getAll)

categotyOfPoiRouter.get('/poi/:id',categotyController.getById)

categotyOfPoiRouter.get('/poi/:name',categotyController.getByName)

categotyOfPoiRouter.delete('pois/:id',categotyController.deleteById)

categotyOfPoiRouter.post('/pois',categotyController.create)

categotyOfPoiRouter.patch('/pois/:id',categotyController.updateById)


