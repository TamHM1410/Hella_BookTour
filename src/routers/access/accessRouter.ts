import express from "express";
import { accessController } from "../../controllers/accessController";
import { checkLogin } from "../../auth/checkLogin";

export const accessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication Api
 */

/**A
 * @openapi
 * '/api/v1/signUp':
 *   post:
 *     tags:
 *        [Authentication]
 *     summary: Register new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phone
 *               - fullName
 *               - password
 *               - gender
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *               fullName:
 *                 type: string
 *                 description: The name of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               gender:
 *                 type: string
 *                 enum: ['male', 'female', 'other']
 *                 description: The gender of the user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
accessRouter.post("/signUp", accessController.signUp);

accessRouter.post("/logOut", checkLogin, accessController.logOut);

/**
 * @swagger
 * /api/v1/signIn:
 *   post:
 *     summary: Log in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email


 *               - password

 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user

 *               password:
 *                 type: string
 *                 description: The password of the user

 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
accessRouter.post("/signIn", accessController.signIn);
