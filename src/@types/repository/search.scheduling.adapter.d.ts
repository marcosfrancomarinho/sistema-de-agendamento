import { IScheduleData } from '../controllers/create.scheduling';

export interface IResponseSearchDataBase extends IScheduleData {
	id: number;
}
export interface ISearchSchedulingAdapter {
	selectDb(): Promise<IResponseSearchDataBase[]>;
	selectDbOne(id: number): Promise<IResponseSearchDataBase | null>;
}
