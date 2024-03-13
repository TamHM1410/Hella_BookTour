import { uploadfileController } from "../../controllers/uploadfile.controller";
import multer from "multer";

import express from "express";
const upload = multer();
export const uploadfileRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upload File
 *   description: UploadFile API
 */

/**
 * @swagger
 * /api/v1/upload:
 *   get:
 *     summary: Upload a file
 *     tags: [Upload File]
 *     requestBody:
 *       description: File data to be uploaded
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
uploadfileRouter.get("/upload",  uploadfileController.uploadFile);

/**
 * @swagger
 * /api/v1/files:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload File]
 *     requestBody:
 *       description: Files data to be uploaded
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '401':
 *         description: Files missing
 *         content:
 *           application/json:
 *             example:
 *               error: Files missing
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
uploadfileRouter.post("/files", upload.any(), uploadfileController.uploadFiles);
uploadfileRouter.get("/files",  uploadfileController.getAllImage);