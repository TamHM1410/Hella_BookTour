import express from 'express'
import { paymentController } from '../../controllers/payment.controller'
export const  paymentRouter=express.Router()

paymentRouter.get('/payments',paymentController.getAll)

paymentRouter.get('/payments/:id',paymentController.getPaymentById)

paymentRouter.get('/payments/name',paymentController.getPaymentByName)

paymentRouter.post('/payments',paymentController.createNewPayment)

paymentRouter.delete('/payments/:id',paymentController.deletetById)

paymentRouter.patch('/payments/:id',paymentController.updateById)

