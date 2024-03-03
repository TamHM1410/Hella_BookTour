import express from 'express'
import { paymentMethodController } from '../../controllers/paymentMethod.controoler'

export const paymentMethodRouter=express.Router()
/**
 * @swagger
 * tags:
 *   name: Payment Method
 *   description: PaymentMethod API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment Method:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         paymentType:
 *           type: string
 *         note:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/paymentMethods:
 *   get:
 *     summary: Get all payment methods or filter payment methods by type
 *     tags: [Payment Method]
 *     parameters:
 *       - name: paymentType
 *         in: query
 *         description: Type of payment method (e.g., Vnpay, Paypal)
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

paymentMethodRouter.get('/paymentMethods',paymentMethodController.getAll)

/**
 * @swagger
 * /api/v1/paymentMethods/{id}:
 *   get:
 *     summary: Get a specific payment method by ID
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment method
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '500':
 *         description: Internal Server Error
 */
paymentMethodRouter.get('/paymentMethods/:id',paymentMethodController.getById)



/**
 * @swagger
 * /api/v1/paymentMethods/{id}:
 *   delete:
 *     summary: Delete a payment method by ID
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment method to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Payment method deleted successfully
 *       '500':
 *         description: Internal Server Error
 */
paymentMethodRouter.delete('/paymentMethods/:id',paymentMethodController.deleteById)

/**
 * @swagger
 * /api/v1/paymentMethods/{id}:
 *   patch:
 *     summary: Update information about a specific payment method
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payment method to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated payment method data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentType:
 *                 type: string
 *               note:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '500':
 *         description: Internal Server Error
 */
paymentMethodRouter.patch('/paymentMethods/:id',paymentMethodController.update)

/**
 * @swagger
 * /api/v1/paymentMethods:
 *   post:
 *     summary: Create a new payment method
 *     tags: [Payment Method]
 *     requestBody:
 *       description: Payment method data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentType:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '500':
 *         description: Internal Server Error
 */
paymentMethodRouter.post('/paymentMethods',paymentMethodController.create)

