import express from 'express'
import { locationController } from '../../controllers/location.Controller'

export const locationRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Location API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cityId:
 *           type: integer
 *         locationName:
 *           type: string
 *         locationAddress:
 *           type: string
 *         status:
 *           type: boolean
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
 * /api/v1/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Location]
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
locationRouter.get('/locations',locationController.getAll)

/**
 * @swagger
 * /api/v1/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     requestBody:
 *       description: Location data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityId:
 *                 type: integer
 *               locationName:
 *                 type: string
 *               locationAddress:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Location created successfully
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
locationRouter.post('/locations/',locationController.createLocation)

/**
 * @swagger
 * /api/v1/locations/name:
 *   get:
 *     summary: Get location by name
 *     tags: [Location]
 *     parameters:
 *       - name: locationName
 *         in: query
 *         required: true
 *         description: Name of the location to retrieve
 *         schema:
 *           type: string
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
locationRouter.get('/locations/name',locationController.getLocationByName)

/**
 * @swagger
 * /api/v1/locations/address:
 *   get:
 *     summary: Get location by address
 *     tags: [Location]
 *     parameters:
 *       - name: locationAddress
 *         in: query
 *         required: true
 *         description: Address of the location to retrieve
 *         schema:
 *           type: string
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
locationRouter.get('/locations/address',locationController.getLocationByAdress)

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   patch:
 *     summary: Update location by ID
 *     tags: [Location]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated location data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityId:
 *                 type: integer
 *               locationName:
 *                 type: string
 *               locationAddress:
 *                 type: string
 *               status:
 *                 type: boolean
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
locationRouter.patch('/locations/:id',locationController.updateLocation)

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   delete:
 *     summary: Delete location by ID
 *     tags: [Location]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location to delete
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
locationRouter.delete('/locations/:id',locationController.deleteLocation)


