import express from "express";
import tourguideController from "../../controllers/tourguide.controller";
export const tourguideRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tourguide
 *   description: Tourguide API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tourguide:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         language:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/tourguides:
 *   get:
 *     summary: Get all tourguides
 *     tags: [Tourguide]
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
tourguideRouter.get("/tourguides", tourguideController.getAllTourguide);

/**
 * @swagger
 * /api/v1/tourguides:
 *   post:
 *     summary: Create a new tourguide
 *     tags: [Tourguide]
 *     requestBody:
 *       description: Tourguide data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tourguide'
 *     responses:
 *       '200':
 *         description: Tourguide created successfully
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
tourguideRouter.post("/tourguides", tourguideController.createTourguide);

/**
 * @swagger
 * /api/v1/tourguides/{id}:
 *   patch:
 *     summary: Update a tourguide by ID
 *     tags: [Tourguide]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tourguide to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated tourguide data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tourguide'
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
tourguideRouter.patch("/tourguides/:id", tourguideController.updateTourguide);

/**
 * @swagger
 * /api/v1/tourguides/{id}:
 *   get:
 *     summary: Get a tourguide by ID
 *     tags: [Tourguide]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tourguide to retrieve
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
tourguideRouter.get("/tourguides/:id", tourguideController.getTourguideById);

/**
 * @swagger
 * /api/v1/tourguides/{id}:
 *   delete:
 *     summary: Delete a tourguide by ID
 *     tags: [Tourguide]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tourguide to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Delete successful
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
tourguideRouter.delete("/tourguides/:id", tourguideController.deleteTourguide);
