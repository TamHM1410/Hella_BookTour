import express from "express";
import {
  verifyTokenGoogle,
  CheckExistAccount,
} from "../../config/Firebase/firebase.admin";

export const firebaseRouter = express.Router();

firebaseRouter.post(
  "/Firebase/verifyGoogle",
  verifyTokenGoogle,
  CheckExistAccount
);
