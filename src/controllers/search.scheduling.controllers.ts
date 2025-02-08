import { Request, Response, NextFunction } from 'express';
import { ISearchSchedulingAdapterControllers } from '../@types/controllers/search.scheduling';
import { ISearchSchedulingServices } from '../@types/services/search.scheduling.services';
import { IResponseSearchDataBase } from '../@types/repository/search.scheduling.adapter';

export class SearchSchedulingControlllers implements ISearchSchedulingAdapterControllers {
	constructor(private searchSchedulingServices: ISearchSchedulingServices) {}
	public execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
		try {
			const appointments: IResponseSearchDataBase[] = await this.searchSchedulingServices.findAll();
			response.status(200).json(appointments);
		} catch (error) {
			next(error);
		}
	};
}
