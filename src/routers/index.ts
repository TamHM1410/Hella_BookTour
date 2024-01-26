
  import { Express} from 'express'; 
  import { accessRouter } from './access/accessRouter';
import { cityRouter } from './City/city.router';
import { locationActivityRouter } from './location_activity/location.activity.router';


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
    app.use('/api/v1',cityRouter)
    app.use('/api/v1',locationActivityRouter)
  
   
  }

