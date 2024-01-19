import 'dotenv/config'
export const option = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hella Booking API with Swagger",
        version: "0.1.0",
        description:
          "This is a  booking  API application  and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "More info with tamdeptrai",
          url: "facebook.com/toilatam1410",
          email: "hunhminhtam@gmail.com",
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}/`,
        },
      ],
    },
    apis: ["../../routers/access/*.ts"],
  };