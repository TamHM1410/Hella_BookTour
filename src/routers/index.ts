
import { Express} from 'express';
import { accessRouter } from './access/accessRouter';

export const initApi =(app :Express)=>{

    return app.use('/api/v1',accessRouter )
}

