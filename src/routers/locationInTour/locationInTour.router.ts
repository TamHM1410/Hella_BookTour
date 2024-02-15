import express from 'express'
import { locationInTourController } from '../../controllers/locationInTour.controller'

export const locationInTourRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Location In Tour
 *   description: Location In Tour API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location In Tour:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         locationId:
 *           type: integer
 *         tourId:
 *           type: integer
 *         duration:
 *           type: string
 *         status:
 *           type: boolean
 *         description:
 *           type: string
 *         startCity:
 *           type: string
 *         endCity:
 *           type: string
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
 * /api/v1/locationInTours:
 *   get:
 *     summary: Get all locations in tours
 *     tags: [Location In Tour]
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
locationInTourRouter.get('/locationInTours',locationInTourController.getAll)

/**
 * @swagger
 * /api/v1/locationInTours/{id}:
 *   get:
 *     summary: Get information about a specific location in tour by ID
 *     tags: [Location In Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location in tour to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationInTour'
 *       '404':
 *         description: Location in tour not found
 *         content:
 *           application/json:
 *             example:
 *               error: Location in tour not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
locationInTourRouter.get('/locationInTours/:id',locationInTourController.getById)

/**
 * @swagger
 * /api/v1/locationInTours/{id}:
 *   delete:
 *     summary: Delete location in tour by ID
 *     tags: [Location In Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location in tour to delete
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
locationInTourRouter.delete('/locationInTours/:id',locationInTourController.deleteById)

/**
 * @swagger
 * /api/v1/locationInTours:
 *   post:
 *     summary: Create a new location in tour
 *     tags: [Location In Tour]
 *     requestBody:
 *       description: Location in tour data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: integer
 *               tourId:
 *                 type: integer
 *               duration:
 *                 type: string
 *               status:
 *                 type: boolean
 *               description:
 *                 type: string
 *               startCity:
 *                 type: string
 *               endCity:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Location in tour created successfully
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
locationInTourRouter.post('/locationInTours',locationInTourController.createNew)

/**
 * @swagger
 * /api/v1/locationInTours/{id}:
 *   patch:
 *     summary: Update location in tour by ID
 *     tags: [Location In Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location in tour to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated location in tour data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: integer
 *               tourId:
 *                 type: integer
 *               duration:
 *                 type: string
 *               status:
 *                 type: boolean
 *               description:
 *                 type: string
 *               startCity:
 *                 type: string
 *               endCity:
 *                 type: string
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
locationInTourRouter.patch('/locationInTours/:id',locationInTourController.updateById)


