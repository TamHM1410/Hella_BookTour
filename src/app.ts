import express from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'

import helmet from "helmet";
import morgan from "morgan";
import { initApi } from "./routers";

export const app = express();
app.set("trust proxy", true);
app.use(helmet()); //ngan chan trang tt3
app.use(morgan("dev"));
app.use(compression()); //tang toc van chuyen data
app.use(
  cors({
    origin: ["http://localhost:3000", "ws://127.0.0.1:58202/Y0K-wQ8gR60=/ws", "https://booking-tour-zeta.vercel.app", "https://localhost:3000","https://hella-booking-ant.vercel.app"],
    credentials: true,
    
  })
);
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

initApi(app);
const memoryUsage = process.memoryUsage();
console.log(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
////init router
