import { IQueryResult } from '../repository/create.scheduling';

export interface ICreateSchedulingServices {
	add(name: string, email: string, phone: string, datahours: Date): Promise<IQueryResult>;
}
