import { ICreateSchedulingAdapter, IQueryResult } from "../@types/integrations/create.scheduling";
import { ICreateSchedulingServices } from "../@types/services/create.scheduling.services";

export class CreateSchedulingServices implements ICreateSchedulingServices {
	constructor(private createSchedulingAdapter: ICreateSchedulingAdapter) {}
	public add = async (name: string, email: string, phone: string, data_hour: string): Promise<IQueryResult> => {
		try {
			const responseQueryDatabase: IQueryResult = await this.createSchedulingAdapter.insertDb(name, email, phone, data_hour);
			return responseQueryDatabase;
		} catch (error) {
			throw error as Error;
		}
	};
}
