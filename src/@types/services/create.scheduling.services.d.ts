import { IQueryResult } from "../integrations/create.scheduling";

export interface ICreateSchedulingServices {
	add(name: string, email: string, phone: string, data_hour: string): Promise<IQueryResult>;
}
