import express from 'express';
import { point_Of_InterestController } from '../../controllers/pointOfInterest.Controller';
import multer from "multer";
const upload = multer();
export const pointOfInterestRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Point Of Interest
 *   description: Point Of Interest API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Point Of Interest:
 *       type: object
 *       properties:
 *         POIName:
 *           type: string
 *         POIDescription:
 *           type: string
 *         locationId:
 *           type: integer
 *         categoryPOI_ID:
 *           type: integer
 *         status:
 *           type: boolean
 *         id:
 *           type: integer
 */

/**
 * @swagger
 * /api/v1/pois:
 *   get:
 *     summary: Get all points of interest
 *     tags: [Point Of Interest]
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
pointOfInterestRouter.get('/pois', point_Of_InterestController.getPointOfInterest);

/**
 * @swagger
 * /api/v1/pois/{id}:
 *   get:
 *     summary: Get a point of interest by ID
 *     tags: [Point Of Interest]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the point of interest to retrieve
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
pointOfInterestRouter.get('/pois/:id', point_Of_InterestController.getPointOfInterestById);

/**
 * @swagger
 * /api/v1/pois:
 *   post:
 *     summary: Create a new point of interest
 *     tags: [Point Of Interest]
 *     requestBody:
 *       description: Point of interest data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pois'
 *     responses:
 *       '200':
 *         description: Point of interest created successfully
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
pointOfInterestRouter.post('/pois', point_Of_InterestController.creatNewPointOfInterest);

/**
 * @swagger
 * /api/v1/pois/{id}:
 *   patch:
 *     summary: Update a point of interest by ID
 *     tags: [Point Of Interest]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the point of interest to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated point of interest data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pois'
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
pointOfInterestRouter.patch('/pois/:id',upload.any(), point_Of_InterestController.updatePointOfInterestById);

/**
 * @swagger
 * /api/v1/pois/{id}:
 *   delete:
 *     summary: Delete a point of interest by ID
 *     tags: [Point Of Interest]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the point of interest to delete
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
pointOfInterestRouter.delete('/pois/:id', point_Of_InterestController.deletePointOfInterestById);
