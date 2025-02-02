import { CreateSchedulingControlllers } from "../controllers/create.scheduling.controllers";
import { CreateSchedulingAdapter } from "../repository/create.scheduling.adapter";
import { SearchSchedulingAdapter } from "../repository/search.scheduling.adapter";
import { CreateSchedulingServices } from "../services/create.scheduling.services";

import { CheckDatasBodyRequestMiddleware } from "../middleware/check.datas.body.request.middleware";
import { VerifyDatasAdapter } from "../repository/verify.datas.adapter";

import { FormatDataHours } from "../utils/format.data.hours";

const createSchedulingAdapter = new CreateSchedulingAdapter();
const searchSchedulingAdapter = new SearchSchedulingAdapter();
const formatDataHours = new FormatDataHours();
const createSchedulingServices = new CreateSchedulingServices(createSchedulingAdapter, searchSchedulingAdapter, formatDataHours);
const createSchedulingControllers = new CreateSchedulingControlllers(createSchedulingServices);

const verifyDatasAdapter = new VerifyDatasAdapter();
const checkDatasBodyRequestMiddleware = new CheckDatasBodyRequestMiddleware(verifyDatasAdapter);

export { createSchedulingControllers, checkDatasBodyRequestMiddleware };
