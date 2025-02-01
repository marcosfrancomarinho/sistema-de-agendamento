import { Router } from "express";
import { createSchedulingControllers, checkDatasBodyRequestMiddleware } from "../config/intances";

const createSchedulingRouter = Router();

createSchedulingRouter.post("/", checkDatasBodyRequestMiddleware.valiadate, createSchedulingControllers.execute);

export { createSchedulingRouter };
