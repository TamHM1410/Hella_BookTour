import express from 'express'
import { bookingController } from '../../controllers/booking.controller'

export const bookingRouter=express.Router()


bookingRouter.get('/bookings',bookingController.getAll)

bookingRouter.get('/bookings/:id',bookingController.getById)

bookingRouter.post('/bookins',bookingController.createBooking)

bookingRouter.delete('/bookings/:id',bookingController.deleteById)


bookingRouter.patch('/bookings/:id',bookingController.updateBooking)