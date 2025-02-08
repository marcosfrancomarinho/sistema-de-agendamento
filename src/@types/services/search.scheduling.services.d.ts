import { IScheduleData } from '../controllers/create.scheduling';
import { IResponseSearchDataBase } from '../repository/search.scheduling.adapter';

export interface ISearchSchedulingServices {
	findAll(): Promise<IResponseSearchDataBase[]>;
	finOne(id: number): Promise<IResponseSearchDataBase>;
}
