
  import { Express} from 'express'; 
  import { accessRouter } from './access/accessRouter';
  import { tourRouter } from './Tour/tourRouter'


/**
 * @openapi
 * /ping:
 *  get:
 *     tags:
 *     - Ping
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
  export const initApi =(app :Express)=>{
  
    app.use('/api/v1',accessRouter )
    app.use('/api/v1',tourRouter)
  
   
  }

