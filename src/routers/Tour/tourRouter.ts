import express from 'express';
import { tourController } from '../../controllers/tour.controller';

export const tourRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: API for managing tours
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tourName:
 *           type: string
 *         status:
 *           type: boolean
 *         price:
 *           type: number
 *         vehicleTypeId:
 *           type: integer
 *         tourType:
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
 * /api/v1/tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tour'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
tourRouter.get('/', tourController.getAll);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     summary: Get a specific tour by ID
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '404':
 *         description: Tour not found
 */
tourRouter.get('/:id', tourController.getById);

/**
 * @swagger
 * /api/v1/tours:
 *   post:
 *     summary: Create a new tour
 *     tags: [Tours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       '200':
 *         description: Tour created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
tourRouter.post('/', tourController.createNewTour);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   delete:
 *     summary: Delete a tour by ID
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Tour deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tour deleted successfully
 *       '404':
 *         description: Tour not found
 *       '500':
 *         description: Internal Server Error
 */
tourRouter.delete('/:id', tourController.deleteById);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   patch:
 *     summary: Update information about a specific tour
 *     tags: [Tours]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tour to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated tour data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       '404':
 *         description: Tour not found
 *         content:
 *           application/json:
 *             example:
 *               error: Tour not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
tourRouter.patch('/:id', tourController.updateTour);

