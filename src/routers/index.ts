
import { Express} from 'express'; 
import { accessRouter } from './access/accessRouter';
import { cityRouter } from './City/city.router';
import { locationActivityRouter } from './location_activity/location.activity.router';
import { locationRouter } from './location/location.router';
import { locationInTourRouter } from './locationInTour/locationInTour.router';
import { tourRouter } from './Tour/tourRouter';
import { paymentRouter } from './payment/payment.router';


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
    
    app.use('/api/v1',accessRouter )////access router
    app.use('/api/v1',cityRouter)   ///city router
    app.use('/api/v1',locationActivityRouter) ///location activity router
    app.use('/api/v1',locationRouter) /// location router
    app.use('/api/v1',locationInTourRouter) //location in tour router
    app.use('/api/v1',tourRouter )////tour router
    app.use('/api/v1',paymentRouter )////tour router
  
   
  }

