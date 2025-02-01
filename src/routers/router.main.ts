import { Router } from "express";
import { createSchedulingRouter } from "./create.scheduling.router";

const routerMain = Router();

routerMain.use("/create-scheduling", createSchedulingRouter);

export { routerMain };
