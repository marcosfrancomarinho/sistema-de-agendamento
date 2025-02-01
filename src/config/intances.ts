import { CreateSchedulingControlllers } from "../controllers/create.scheduling.controllers";
import { CreteSchedulingAdapter } from "../integrations/create.scheduling.adapter";
import { CreateSchedulingServices } from "../services/create.scheduling.services";

const creteSchedulingAdapter = new CreteSchedulingAdapter();
const createSchedulingServices = new CreateSchedulingServices(creteSchedulingAdapter);
const createSchedulingControlllers = new CreateSchedulingControlllers(createSchedulingServices);

export { createSchedulingControlllers };
