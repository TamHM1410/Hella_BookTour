import { vehicleController } from "../../controllers/vehicleType.controller";
import express from 'express'
export const vehicleRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         vehicleName:
 *           type: string
 *         status:
 *           type: boolean
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
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicle]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.get('/vehicles',vehicleController.getAll)

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Get a specific vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.get('/vehicles/:id',vehicleController.getById)

/**
 * @swagger
 * /api/v1/vehicles/vehicleName:
 *   get:
 *     summary: Get a specific vehicle by name
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleName
 *         required: true
 *         description: Name of the vehicle
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.get('/vehicles/vehicleName',vehicleController.getByName)

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Vehicle deleted successfully
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.delete('/vehicles/:id',vehicleController.deleteById)

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   patch:
 *     summary: Update information about a specific vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated vehicle data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleName:
 *                 type: string
 *               description:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.patch('/vehicles/:id',vehicleController.update)

/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicle]
 *     requestBody:
 *       description: Vehicle data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal Server Error
 */
vehicleRouter.post('/vehicles',vehicleController.create)
