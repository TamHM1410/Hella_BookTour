import express from 'express'
import { paymentController } from '../../controllers/payment.controller'
export const  paymentRouter=express.Router()

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         paymentDate:
 *           type: string
 *           format: date
 *         amount:
 *           type: number
 *         status:
 *           type: boolean
 *         refunded:
 *           type: boolean
 *         refundedTime:
 *           type: string
 *           format: date-time
 *         refundedAmount:
 *           type: string
 *         paymentMethodId:
 *           type: integer
 *         bookingId:
 *           type: integer
 *         paymentName:
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
 * /api/v1/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.get('/payments',paymentController.getAll)

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get a specific payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.get('/payments/:id',paymentController.getPaymentById)

/**
 * @swagger
 * /api/v1/payments/name:
 *   get:
 *     summary: Get a specific payment by name
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: paymentName
 *         required: true
 *         description: Name of the payment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.get('/payments/name',paymentController.getPaymentByName)

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.post('/payments',paymentController.createNewPayment)

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment deleted successfully
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.delete('/payments/:id',paymentController.deletetById)

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   patch:
 *     summary: Update a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
paymentRouter.patch('/payments/:id',paymentController.updateById)

