import express from 'express'
import { vnpayController } from '../../controllers/vnPay.controller'
export const vnPayRouter=express.Router()

vnPayRouter.post('/create_vnpayment',vnpayController.createVnpay)