import { Request, Response, NextFunction } from "express";
import { ICreateSchedulingControllers, IMessageSuccess, IScheduleData } from "../@types/controllers/create.scheduling";
import { ICreateSchedulingServices } from "../@types/services/create.scheduling.services";
import { IQueryResult } from "../@types/repository/create.scheduling";

export class CreateSchedulingControlllers implements ICreateSchedulingControllers {
	constructor(private createSchedulingServices: ICreateSchedulingServices) {}
	private messageSuccess = (id: string): IMessageSuccess => {
		return {
			message: "agendamento realizado com sucesso",
			idUser: id,
		};
	};
	public execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, email, phone, data_hour } = request.body as IScheduleData;
			const { id }: IQueryResult = await this.createSchedulingServices.add(name, email, phone, data_hour);
			response.status(201).json(this.messageSuccess(id));
		} catch (error) {
			next(error);
		}
	};
}
