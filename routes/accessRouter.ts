import express from 'express'
import { accessController } from '../src/controllers/accessController';


export const accessRouter =express.Router()


/**
 * @openapi
 * '/api/heroes':
 *  get:
 *     tags:
 *     - Hero
 *     summary: Get all heroes
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *       400:
 *         description: Bad request
 */
accessRouter.post('/signUp', accessController.signUp);

/**
 * @swagger
 * /signIn:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token
 *       401:
 *         description: Invalid credentials
 */
accessRouter.post('/signIn', accessController.signIn);
