import { Router } from 'express';
import { createSchedulingControllers, checkDatasBodyRequestMiddlewares } from '../configs/intances';

const createSchedulingRouter = Router();

createSchedulingRouter.post('/', checkDatasBodyRequestMiddlewares.valiadate, createSchedulingControllers.execute);

export { createSchedulingRouter };
