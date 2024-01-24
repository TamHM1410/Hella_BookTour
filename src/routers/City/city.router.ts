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