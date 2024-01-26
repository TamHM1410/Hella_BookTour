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
 * /api/v1/location_activity:
 *   get:
 *     summary: Get all Activity
 *     tags: [LocationActivities]
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
locationActivityRouter.get('/location_activity',locationActivityController.getAllLocationActivity)

/**
 * @swaggerv1
 * paths:
 *   /api/v1/location_activities/{id}:
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


locationActivityRouter.get('/location_activity/:id',locationActivityController.getActivityById)
/**
 * @swagger
 * paths:
 *   /api/v1/location_activity/getByActivityName:
 *     get:
 *       summary: Get a specific location activity by name
 *       tags: [LocationActivities]
 *       parameters:
 *         - in: path
 *           name: activityName
 *           required: true
 *           description: Name of the location activity
 *           schema:
 *             type: string
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
locationActivityRouter.get('/location_activity/getByActivityName',locationActivityController.getActivityByName)
/**
 * @swagger
 * /api/v1/location_activity/update/{id}:
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

locationActivityRouter.patch('/location_activity/update/:id',locationActivityController.updateActivityById)


/**
 * @swagger
 * paths:
 *   /location_activities/{id}:
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
locationActivityRouter.delete('/location_activity/delete/:id',locationActivityController.delete)
/**
 * @swagger
 * /api/v1/location_activity/create:
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


locationActivityRouter.post('/location_activity/create',locationActivityController.create)