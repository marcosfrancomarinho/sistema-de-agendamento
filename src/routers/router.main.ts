import { Router } from 'express';
import { createSchedulingRouter } from './create.scheduling.router';
import { searchSchedulingRouter } from './search.scheduling.router';

const routerMain = Router();

routerMain.use('/', searchSchedulingRouter);
routerMain.use('/create-scheduling', createSchedulingRouter);

export { routerMain };
