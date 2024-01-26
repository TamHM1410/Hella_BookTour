import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Request,Response} from 'express'; 






const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello Booking  Tour API',
      description: 'Detail of CRUD API ',
      version: '1.0.0',
    },
  },
  // looks for configuration in specified directories
  apis: ['./src/routers/access/*.ts','./src/routers/City/*.ts','./src/routers/location_activity/*.ts'],
}   

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs=(app :any, port:string |undefined) =>{

  // Swagger Page
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req :Request, res:Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs