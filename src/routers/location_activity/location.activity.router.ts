import express from 'express'
import { locationActivityController } from '../../controllers/location.Activity.controller'
export const locationActivityRouter=express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     LocationActivity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         locationId:
 *           type: integer  # Fix typo here
 *         activityName:
 *           type: string
 *         activityDuration:
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
 * /api/v1/locations/activities:
 *   get:
 *     summary: Get all activities or filter activities by name
 *     tags: [LocationActivities]
 *     parameters:
 *       - name: activityName
 *         in: query
 *         description: Name of the activity to filter by
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationActivity'
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
locationActivityRouter.get('/locations/activities',locationActivityController.getAllLocationActivity)

/**
 * @swaggerv1
 * paths:
 *   /api/v1/locations/activities{id}:
 *     get:
 *       summary: Get a specific location activity by ID
 *       tags: [LocationActivities]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location activity
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LocationActivity'
 *         '404':
 *           description: Location activity not found
 */


locationActivityRouter.get('/locations/activities/:id',locationActivityController.getActivityById)





/**
 * @swagger
 * /api/v1/locations/activities/{id}:
 *   patch:
 *     summary: Update information about a specific city
 *     tags: [LocationActivities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID y to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Updated location activity data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: integer
 *               activityName:
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

locationActivityRouter.patch('/locations/activities/:id',locationActivityController.updateActivityById)


/**
 * @swagger
 * paths:
 *   api/v1/locations/activities/:id:
 *     delete:
 *       summary: Delete a location activity by ID
 *       tags: [LocationActivities]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location activity
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: Location activity deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Location activity deleted successfully
 *         '404':
 *           description: Location activity not found
 */
locationActivityRouter.delete('/locations/activities/:id',locationActivityController.delete)
/**
 * @swagger
 * /api/v1/locations/activities:
 *   post:
 *     summary: Get information about a specific city
 *     tags: [LocationActivities]
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
 *                 locationId:
 *                   type: integer
 *                   format: int64
 *                 activityName:
 *                   type: string
 *                 activityDuration:
 *                   type: string
 *                 activityDescription:
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
 *         description: not found
 *         content:
 *           application/json:
 *             example:
 *               error:  not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


locationActivityRouter.post('/locations/activities',locationActivityController.create)


/**
 * @swagger
 * /api/v1/locations/{id}/activities:
 *   get:
 *     summary: Get activities by location ID
 *     tags: [LocationActivities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the location
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationActivity'
 *       '404':
 *         description: Location not found or no activities found for the location
 *         content:
 *           application/json:
 *             example:
 *               error: Location not found or no activities found for the location
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


locationActivityRouter.get('/locations/:id/activities',locationActivityController.getByLoctionId)



