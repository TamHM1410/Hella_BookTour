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
 * api/v1/city:
 *   get:
 *     summary: Get all cities
 *     tags: [City]
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

cityRouter.get('/city',cityController.getAllCity)
/**
 * @swagger
 * /api/v1/city/create:
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
cityRouter.post('/city/create',cityController.createNewCity)
/**
 * @swagger
 * /api/v1/city/{id}:
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
cityRouter.get('/city/:id',cityController.getCurrentCity)
/**
 * @swagger
 * /api/v1/city/update/{id}:
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

cityRouter.patch(`/city/update/:id`,cityController.updateCity)
/**
 * @swagger
 * /api/v1/city/delete/{id}:
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

cityRouter.delete('/city/delete/:id',cityController.deleteCurrentCity)