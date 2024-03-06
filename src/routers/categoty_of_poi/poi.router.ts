import express from 'express'
import { categotyController } from '../../controllers/category_of_poi.controller'

export const categotyOfPoiRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Categoty Of Poi
 *   description: Categoty Of Poi API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoty Of Poi:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         categoryName:
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
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories of POI (Points of Interest)
 *     tags: [Categoty Of Poi]
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
categotyOfPoiRouter.get('/categories',categotyController.getAll)

/**
 * @swagger
 * /api/v1/poi/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categoty Of Poi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
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
categotyOfPoiRouter.get('/categories/:id',categotyController.getById)


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categoty Of Poi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to delete
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
categotyOfPoiRouter.delete('/categories/:id',categotyController.deleteById)

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categoty Of Poi]
 *     requestBody:
 *       description: Category data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties here
 *     responses:
 *       '200':
 *         description: Category created successfully
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
categotyOfPoiRouter.post('/pois',categotyController.create)

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categoty Of Poi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties here
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
categotyOfPoiRouter.patch('/categories/:id',categotyController.updateById)