import { CreateSchedulingControlllers } from '../controllers/create.scheduling.controllers';
import { CreateSchedulingAdapter } from '../repository/create.scheduling.adapter';
import { SearchSchedulingAdapter } from '../repository/search.scheduling.adapter';
import { CreateSchedulingServices } from '../services/create.scheduling.services';
import { SearchSchedulingControlllers } from '../controllers/search.scheduling.controllers';
import { SearchSchedulingServices } from '../services/search.scheduling.services';
import { CheckDatasBodyRequestMiddlewares } from '../middleware/check.datas.body.request.middleware';
import { VerifyDatasAdapter } from '../repository/verify.datas.adapter';
import { CheckAppointmentServices } from '../services/check.appointment.services';

// Instâncias dos Adapters
const createSchedulingAdapter = new CreateSchedulingAdapter();
const searchSchedulingAdapter = new SearchSchedulingAdapter();
const verifyDatasAdapter = new VerifyDatasAdapter();

// Instâncias dos Services
const checkAppointmentServices = new CheckAppointmentServices(searchSchedulingAdapter);
const createSchedulingServices = new CreateSchedulingServices(createSchedulingAdapter, checkAppointmentServices);
const searchSchedulingServices = new SearchSchedulingServices(searchSchedulingAdapter);

// Instâncias dos Controllers
const createSchedulingControllers = new CreateSchedulingControlllers(createSchedulingServices);
const searchSchedulingControlllers = new SearchSchedulingControlllers(searchSchedulingServices);

// Instâncias dos Middlewares
const checkDatasBodyRequestMiddlewares = new CheckDatasBodyRequestMiddlewares(verifyDatasAdapter);

export { createSchedulingControllers, checkDatasBodyRequestMiddlewares, searchSchedulingControlllers };