import express from 'express'
import { tripController } from '../../controllers/trip.controller'

export const tripRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Trip API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tourId:
 *           type: integer
 *         totalCustomer:
 *           type: integer
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: boolean
 *         tourGuideId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deleteAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trip]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       '500':
 *         description: Internal Server Error
 */
tripRouter.get('/trips',tripController.getAll)

/**
 * @swagger
 * /api/v1/trips/{id}:
 *   get:
 *     summary: Get a specific trip by ID
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the trip
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 */
tripRouter.get('/trips/:id',tripController.getTripById)

/**
 * @swagger
 * /api/v1/trips/{id}:
 *   delete:
 *     summary: Delete a trip by ID
 *     tags: [Trip]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the trip to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Trip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trip deleted successfully
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error
 */
tripRouter.delete('/trips/:id',tripController.deleteTripById)

/**
 * @swagger
 * /api/v1/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trip]
 *     requestBody:
 *       description: Trip data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '500':
 *         description: Internal Server Error
 */
tripRouter.post('/trips',tripController.createTrip)

/**
 * @swagger
 * /api/v1/trips/{id}:
 *   patch:
 *     summary: Update information about a specific trip
 *     tags: [Trip]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the trip to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Updated trip data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Internal Server Error
 */
tripRouter.patch('/trips/:id',tripController.updateTrip)