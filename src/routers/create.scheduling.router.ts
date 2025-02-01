import { Router } from "express";
import { createSchedulingControlllers } from "../config/intances";

const createSchedulingRouter = Router();

createSchedulingRouter.post("/", createSchedulingControlllers.addNewScheduling);

export { createSchedulingRouter };
