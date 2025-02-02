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
	private getSchedulingDaRequest = (request: Request): IScheduleData => {
		const { datahours, ...rest } = request.body;
		const _date_hour_converted_format_date: Date = new Date(datahours);
		return {
			datahours: _date_hour_converted_format_date,
			...rest,
		} as IScheduleData;
	};
	public execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, email, phone, datahours } = this.getSchedulingDaRequest(request);
			const { id }: IQueryResult = await this.createSchedulingServices.add(name, email, phone, datahours);
			response.status(201).json(this.messageSuccess(id));
		} catch (error) {
			next(error);
		}
	};
}
