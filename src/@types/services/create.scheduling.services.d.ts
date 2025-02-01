import { IQueryResult } from "../integrations/create.scheduling";

export interface ICreateSchedulingServices {
	createNewScheduling(name: string, email: string, phone: string, data_hour: string): Promise<IQueryResult>;
}
