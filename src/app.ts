import express from 'express'
import compression from "compression";
import cors from 'cors'
import cookieParser from "cookie-parser";

import helmet from "helmet";
import morgan from "morgan";
import { initApi } from './routers';

export const app =express()

app.set("trust proxy", 1);
app.use(helmet()); //ngan chan trang tt3
app.use(morgan("dev"));
app.use(compression()); //tang toc van chuyen data
app.use(
    cors({
      origin: ["http://localhost:3000", "ws://127.0.0.1:58202/Y0K-wQ8gR60=/ws","https://booking-tour-zeta.vercel.app","https://localhost:3000"],
      credentials: true,
    })
  );
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.enable('trust proxy')

initApi(app)
////init router 

