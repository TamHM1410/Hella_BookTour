
import { Express} from 'express'; 
import { accessRouter } from './access/accessRouter';
import { cityRouter } from './City/city.router';
import { locationActivityRouter } from './location_activity/location.activity.router';
import { locationRouter } from './location/location.router';
import { locationInTourRouter } from './locationInTour/locationInTour.router';
import { tourRouter } from './Tour/tourRouter';
import { paymentRouter } from './payment/payment.router';
import { tripRouter } from './trip/trip.router';
import { bookingRouter } from './booking/booking.router';
import { categotyOfPoiRouter } from './categoty_of_poi/poi.router';
import { paymentMethodRouter } from './paymentMethod/paymentMethod.router';

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
    app.use('/api/v1',locationRouter) 
    app.use('/api/v1',locationInTourRouter) 
    app.use('/api/v1',tourRouter )
    app.use('/api/v1',paymentRouter )
    app.use('/api/v1',tripRouter )
    app.use('/api/v1',bookingRouter )
    app.use('/api/v1',categotyOfPoiRouter)
    app.use('/api/v1',paymentMethodRouter)
  
   
  }

