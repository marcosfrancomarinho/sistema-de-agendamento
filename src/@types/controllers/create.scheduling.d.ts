import { Response, Request, NextFunction } from "express";

export interface ICreateSchedulingControllers {
	execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
export type IScheduleData = {
	name: string;
	email: string;
	phone: string;
	datahours: Date;
};
export type IMessageSuccess = {
	message: string;
	idUser: string;
};
