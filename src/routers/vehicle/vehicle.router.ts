import express from "express";
import { vehicleController } from "../../controllers/vehicle.Controller";

export const vehicleRouter = express.Router()

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
 * /api/v1/vehicle:
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
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

vehicleRouter.get('/vehicle', vehicleController.getAllVehicle);

/**
 * @swagger
 * /api/v1/vehicle/create:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicle]
 *     requestBody:
 *       description: Vehicle data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       '200':
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               error: Conflict
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

vehicleRouter.post('/vehicle/create', vehicleController.createNewVehicle);

/**
 * @swagger
 * /api/v1/vehicle/{id}:
 *   get:
 *     summary: Get information about a specific vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the vehicle to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '404':
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             example:
 *               error: Vehicle not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

vehicleRouter.get('/vehicle/:id', vehicleController.getCurrentVehicle);

/**
 * @swagger
 * /api/v1/vehicle/update/{id}:
 *   patch:
 *     summary: Update information about a specific vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - name: id
 *         in: path
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
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '404':
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             example:
 *               error: Vehicle not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

vehicleRouter.patch('/vehicle/update/:id', vehicleController.updateVehicle);

/**
 * @swagger
 * /api/v1/vehicle/delete/{id}:
 *   delete:
 *     summary: Delete a specific vehicle
 *     tags: [Vehicle]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the vehicle to delete
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
 *       '404':
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             example:
 *               error: Vehicle not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

vehicleRouter.delete('/vehicle/delete/:id', vehicleController.deleteCurrentVehicle);