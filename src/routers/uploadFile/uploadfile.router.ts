import { uploadfileController } from "../../controllers/uploadfile.controller";
import multer from "multer";

import express from 'express'
const upload = multer()
export const uploadfileRouter=express.Router()

uploadfileRouter.get('/upload',upload.any(),uploadfileController.uploadFile)
uploadfileRouter.post('/files',upload.any(),uploadfileController.uploadFiles)