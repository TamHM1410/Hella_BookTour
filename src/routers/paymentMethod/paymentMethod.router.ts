import express from 'express'
import { paymentMethodController } from '../../controllers/paymentMethod.controoler'

export const paymentMethodRouter=express.Router()


paymentMethodRouter.get('/paymentMethods',paymentMethodController.getAll)

paymentMethodRouter.get('/paymentMethods/:id',paymentMethodController.getById)

paymentMethodRouter.get('/paymentMethods/paymentType',paymentMethodController.getByPaymentType)

paymentMethodRouter.delete('/paymentMethods/:id',paymentMethodController.deleteById)

paymentMethodRouter.patch('/paymentMethods/:id',paymentMethodController.update)

paymentMethodRouter.post('/paymentMethods',paymentMethodController.create)

