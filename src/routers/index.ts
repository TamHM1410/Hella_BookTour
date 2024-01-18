
import { Express} from 'express';
import { accessRouter } from './access/accessRouter';
import { tourRouter } from './Tour/tourRouter';

export const initApi =(app :Express)=>{

  app.use('/api/v1',accessRouter )
  app.use('/api/v1',tourRouter)
}

