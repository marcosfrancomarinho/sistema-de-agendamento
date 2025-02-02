import { Request, NextFunction, Response } from "express";
import { ICheckDatasBodyRequestMiddleware } from "../@types/middleware/check.datas.body.request.middleware";
import { IVerifyDatasAdapter } from "../@types/repository/verify.datas.adapter";
import { IScheduleData } from "../@types/controllers/create.scheduling";

export class CheckDatasBodyRequestMiddleware implements ICheckDatasBodyRequestMiddleware {
	constructor(private verifyDatasAdapter: IVerifyDatasAdapter) {}
	public valiadate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, email, phone, data_hour } = request.body as IScheduleData;
			await this.verifyDatasAdapter.checkDatasBodyRequest(name, email, phone, data_hour);
			next();
		} catch (error) {
			response.status(400).json({ error: (error as Error).message });
		}
	};
}
