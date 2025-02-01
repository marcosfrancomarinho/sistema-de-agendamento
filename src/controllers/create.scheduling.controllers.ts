import { Request, Response, NextFunction } from "express";
import { ICreateSchedulingControllers, IScheduleData } from "../@types/controllers/create.scheduling";
import { ICreateSchedulingServices } from "../@types/services/create.scheduling.services";
import { IQueryResult } from "../@types/integrations/create.scheduling";
import { ModelChedulingControllers } from "./model.cheduling.controllers";

export class CreateSchedulingControlllers
	extends ModelChedulingControllers<IScheduleData>
	implements ICreateSchedulingControllers
{
	constructor(private createSchedulingServices: ICreateSchedulingServices) {
		super();
	}
	public addNewScheduling = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, email, phone, data_hour } = this.getRequestBody(request);
			const { id }: IQueryResult = await this.createSchedulingServices.createNewScheduling(name, email, phone, data_hour);
			response.status(201).json(this.messageSuccess(id));
		} catch (error) {
			next(error);
		}
	};
}
