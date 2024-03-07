import express from 'express'
import { cityController } from '../../controllers/city.Controller'




export const cityRouter=express.Router()
/**
 * @swagger
 * tags:
 *   name: City
 *   description: City API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cityName:
 *           type: string
 *         country:
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
 * /api/v1/city:
 *   get:
 *     summary: Get all cities
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *         description: The name of the city to filter by.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid parameters
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


cityRouter.get('/cities',cityController.getAllCity)
/**
 * @swagger
 * /api/v1/cities:
 *   post:
 *     summary: Create a new city
 *     tags: [City]
 *     requestBody:
 *       description: City data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *               country:
 *                 type: string
 *               status:
 *                 type: boolean
 *               createAt:
 *                 type: string
 *                 format: date-time
 *               updateAt:
 *                 type: string
 *                 format: date-time
 *               deleteAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid parameters
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
cityRouter.post('/cities',cityController.createNewCity)
/**
 * @swagger
 * /api/v1/cities/{id}:
 *   get:
 *     summary: Get information about a specific city
 *     tags: [City]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the city to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int64
 *                 cityName:
 *                   type: string
 *                 country:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 createAt:
 *                   type: string
 *                   format: date-time
 *                 updateAt:
 *                   type: string
 *                   format: date-time
 *                 deleteAt:
 *                   type: string
 *                   format: date-time
 *       '404':
 *         description: City not found
 *         content:
 *           application/json:
 *             example:
 *               error: City not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
cityRouter.get('/cities/:id',cityController.getCurrentCity)
/**
 * @swagger
 * /api/v1/cities/{id}:
 *   patch:
 *     summary: Update information about a specific city
 *     tags: [City]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the city to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Updated city data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *               country:
 *                 type: string
 *               status:
 *                 type: boolean
 *               updateAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int64
 *                 cityName:
 *                   type: string
 *                 country:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 createAt:
 *                   type: string
 *                   format: date-time
 *                 updateAt:
 *                   type: string
 *                   format: date-time
 *                 deleteAt:
 *                   type: string
 *                   format: date-time
 *               message:
 *                 type: string
 *                 description: Update successful message
 *       '404':
 *         description: City not found
 *         content:
 *           application/json:
 *             example:
 *               error: City not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

cityRouter.patch(`/cities/:id`,cityController.updateCity)
/**
 * @swagger
 * /api/v1/cities/{id}:
 *   delete:
 *     summary: Delete a specific city
 *     tags: [City]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the city to delete
 *         schema:
 *           type: integer
 *           format: int64
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
 *         description: City not found
 *         content:
 *           application/json:
 *             example:
 *               error: City not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

cityRouter.delete('/city/:id',cityController.deleteCurrentCity)
