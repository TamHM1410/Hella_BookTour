import express from 'express'
import tourController from '../../controllers/test'


export const tourRouter=express.Router()


tourRouter.post('/test',tourController.test)
