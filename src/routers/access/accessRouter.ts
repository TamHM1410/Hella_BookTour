import express from 'express'
import { accessController } from '../../controllers/accessController'

export const accessRouter =express.Router()


accessRouter.post('/signUp',accessController.signUp)
accessRouter.post('/signIn',accessController.signIn)