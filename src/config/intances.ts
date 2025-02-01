import { CreateSchedulingControlllers } from "../controllers/create.scheduling.controllers";
import { CreateSchedulingAdapter } from "../integrations/create.scheduling.adapter";
import { CreateSchedulingServices } from "../services/create.scheduling.services";

import { CheckDatasBodyRequestMiddleware } from "../middleware/check.datas.body.request.middleware";
import { VerifyDatasAdapter } from "../integrations/verify.datas.adapter";

const createSchedulingAdapter = new CreateSchedulingAdapter();
const createSchedulingServices = new CreateSchedulingServices(createSchedulingAdapter);
const createSchedulingControllers = new CreateSchedulingControlllers(createSchedulingServices);

const verifyDatasAdapter = new VerifyDatasAdapter();
const checkDatasBodyRequestMiddleware = new CheckDatasBodyRequestMiddleware(verifyDatasAdapter);

export { createSchedulingControllers, checkDatasBodyRequestMiddleware };
