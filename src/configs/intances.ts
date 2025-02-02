import { CreateSchedulingControlllers } from "../controllers/create.scheduling.controllers";
import { CreateSchedulingAdapter } from "../repository/create.scheduling.adapter";
import { SearchSchedulingAdapter } from "../repository/search.scheduling.adapter";
import { CreateSchedulingServices } from "../services/create.scheduling.services";

import { CheckDatasBodyRequestMiddleware } from "../middleware/check.datas.body.request.middleware";
import { VerifyDatasAdapter } from "../repository/verify.datas.adapter";
import { CheckAppointmentServices } from "../services/check.appointment.services";

const createSchedulingAdapter = new CreateSchedulingAdapter();
const searchSchedulingAdapter = new SearchSchedulingAdapter();
const checkAppointmentServices = new CheckAppointmentServices(searchSchedulingAdapter);
const createSchedulingServices = new CreateSchedulingServices(createSchedulingAdapter, checkAppointmentServices);
const createSchedulingControllers = new CreateSchedulingControlllers(createSchedulingServices);

const verifyDatasAdapter = new VerifyDatasAdapter();
const checkDatasBodyRequestMiddleware = new CheckDatasBodyRequestMiddleware(verifyDatasAdapter);

export { createSchedulingControllers, checkDatasBodyRequestMiddleware };
