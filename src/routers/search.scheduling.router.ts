import { Router } from 'express';
import { searchSchedulingControlllers } from '../configs/intances';

const searchSchedulingRouter = Router();

searchSchedulingRouter.get('/', searchSchedulingControlllers.execute);

export { searchSchedulingRouter };
