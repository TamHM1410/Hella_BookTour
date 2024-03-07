import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello Booking  Tour API",
      description: "Detail of CRUD API ",
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: [
    "./src/routers/access/*.ts",
    "./src/routers/City/*.ts",
    "./src/routers/location_activity/*.ts",
    "./src/routers/booking/*.ts",
    "./src/routers/categoty_of_poi/*.ts",
    "./src/routers/location/*.ts",
    "./src/routers/locationInTour/*.ts",
    "./src/routers/payment/*.ts",
    "./src/routers/Tour/*.ts",
    "./src/routers/trip/*.ts",
    "./src/routers/vehicle/*.ts",
    "./src/routers/paymentMethod/*.ts",
    "./src/routers/pointOfInterest/*.ts",
    "./src/routers/userRouter/*.ts",
    "./src/routers/tourguide/*.ts",
    "./src/routers/uploadFile/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: any, port: string | undefined) => {
  // Swagger Page
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
