import express from "express";
import { bookingController } from "../../controllers/booking.controller";

export const bookingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         bookingDate:
 *           type: string
 *           format: date-time
 *         fromDate:
 *           type: string
 *           format: date-time
 *         toDate:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: string
 *         totalAmount:
 *           type: number
 *         status:
 *           type: boolean
 *         tripId:
 *           type: number
 *         totalCustomer:
 *           type: number
 *         createAt:
 *           type: string
 *           format: date-time
 *         updateAt:
 *           type: string
 *           format: date-time
 *         deleteAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
bookingRouter.get("/bookings", bookingController.getAll);

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
bookingRouter.get("/bookings/:id", bookingController.getById);

/**
 * @swagger
 * /api/v1/bookings/create:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       description: Booking data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *               fromDate:
 *                 type: string
 *                 format: date-time
 *               toDate:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: boolean
 *               tripId:
 *                 type: number
 *               totalCustomer:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
bookingRouter.post("/bookings", bookingController.createBooking);

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Deletion successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Deletion successful message
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
bookingRouter.delete("/bookings/:id", bookingController.deleteById);

/**
 * @swagger
 * /api/v1/bookings/update:
 *   patch:
 *     summary: Update a booking
 *     tags: [Booking]
 *     requestBody:
 *       description: Updated booking data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *               fromDate:
 *                 type: string
 *                 format: date-time
 *               toDate:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: boolean
 *               tripId:
 *                 type: number
 *               totalCustomer:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
bookingRouter.patch("/bookings/:id", bookingController.updateBooking);
