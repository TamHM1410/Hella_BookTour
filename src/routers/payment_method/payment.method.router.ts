import express from 'express';
import { paymentMethodController } from '../../controllers/paymentMethod.Controller';

export const paymentMethodRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: PaymentMethod
 *   description: PaymentMethod API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentMethod:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         paymentType:
 *           type: string
 *         note:
 *           type: string
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
 * /api/v1/paymentMethod:
 *   get:
 *     summary: Get all payment methods
 *     tags: [PaymentMethod]
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

paymentMethodRouter.get('/paymentMethod', paymentMethodController.getAllPaymentMethod);

/**
 * @swagger
 * /api/v1/paymentMethod/create:
 *   post:
 *     summary: Create a new payment method
 *     tags: [PaymentMethod]
 *     requestBody:
 *       description: Payment method data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       '200':
 *         description: Payment method created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               error: Conflict
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

paymentMethodRouter.post('/paymentMethod/create', paymentMethodController.createNewPaymentMethod);

/**
 * @swagger
 * /api/v1/paymentMethod/{id}:
 *   get:
 *     summary: Get information about a specific payment method
 *     tags: [PaymentMethod]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the payment method to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '404':
 *         description: Payment method not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment method not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

paymentMethodRouter.get('/paymentMethod/:id', paymentMethodController.getCurrentPaymentMethod);

/**
 * @swagger
 * /api/v1/paymentMethod/update/{id}:
 *   patch:
 *     summary: Update information about a specific payment method
 *     tags: [PaymentMethod]
 *     parameters:
 *       - name: id
 *         in: path
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
 *             $ref: '#/components/schemas/PaymentMethod'
 *     responses:
 *       '200':
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentMethod'
 *       '404':
 *         description: Payment method not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment method not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

paymentMethodRouter.patch('/paymentMethod/update/:id', paymentMethodController.updatePaymentMethod);

/**
 * @swagger
 * /api/v1/paymentMethod/delete/{id}:
 *   delete:
 *     summary: Delete a specific payment method
 *     tags: [PaymentMethod]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the payment method to delete
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
 *       '404':
 *         description: Payment method not found
 *         content:
 *           application/json:
 *             example:
 *               error: Payment method not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

paymentMethodRouter.delete('/paymentMethod/delete/:id', paymentMethodController.deletePaymentMethod);
