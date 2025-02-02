import { IQueryResult } from "../repository/create.scheduling";

export interface ICreateSchedulingServices {
	add(name: string, email: string, phone: string, data_hour: Date): Promise<IQueryResult>;
}
