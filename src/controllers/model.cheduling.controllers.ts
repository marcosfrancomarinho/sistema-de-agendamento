import { Request } from "express";
import { IMessageSuccess } from "../@types/controllers/create.scheduling";

export class ModelChedulingControllers<T = any> {
	protected getRequestBody = (req: Request): T => {
		const scheduleData = req.body as T;
		return scheduleData;
	};
	protected messageSuccess(id: string): IMessageSuccess {
		return {
			message: "agendamento realizado com sucesso",
			idUser: id,
		};
	}
}
