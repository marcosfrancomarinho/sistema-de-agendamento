import { ICreateSchedulingAdapter, IQueryResult } from "../@types/repository/create.scheduling";
import { ICreateSchedulingServices } from "../@types/services/create.scheduling.services";

export class CreateSchedulingServices implements ICreateSchedulingServices {
	private responseQueryInsertDatabase!: IQueryResult;
	constructor(private createSchedulingAdapter: ICreateSchedulingAdapter) {}
	public add = async (name: string, email: string, phone: string, datahours: Date): Promise<IQueryResult> => {
		try {
			this.responseQueryInsertDatabase = await this.createSchedulingAdapter.insertDb(name, email, phone, datahours);
			return this.responseQueryInsertDatabase;
		} catch (error) {
			throw error as Error;
		}
	};
}
