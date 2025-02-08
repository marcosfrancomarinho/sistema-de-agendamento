import { Request, NextFunction, Response } from 'express';
import { ICheckDatasBodyRequestMiddlewares } from '../@types/middleware/check.datas.body.request.middleware';
import { IVerifyDatasAdapter } from '../@types/repository/verify.datas.adapter';
import { IScheduleData } from '../@types/controllers/create.scheduling';

export class CheckDatasBodyRequestMiddlewares implements ICheckDatasBodyRequestMiddlewares {
	constructor(private verifyDatasAdapter: IVerifyDatasAdapter) {}
	public valiadate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, email, phone, datahours } = request.body as IScheduleData;
			await this.verifyDatasAdapter.checkDatasBodyRequest(name, email, phone, datahours);
			next();
		} catch (error) {
			response.status(400).json({ error: (error as Error).message });
		}
	};
	public validateId = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const id: number = Number(request.params.id);
			await this.verifyDatasAdapter.checkIDBodyRequest(id);
			next();
		} catch (error) {
			response.status(400).json({ error: (error as Error).message });
		}
	};
}
