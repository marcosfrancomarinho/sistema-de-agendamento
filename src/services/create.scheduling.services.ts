import { ICreateSchedulingAdapter, IQueryResult } from "../@types/repository/create.scheduling";
import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { ICreateSchedulingServices } from "../@types/services/create.scheduling.services";
import { IFormatDataHours } from "../@types/utils/format.data.hours";

export class CreateSchedulingServices implements ICreateSchedulingServices {
	constructor(
		private createSchedulingAdapter: ICreateSchedulingAdapter,
		private searchSchedulingAdapter: ISearchSchedulingAdapter,
		private formatDataHours: IFormatDataHours
	) {}
	public add = async (name: string, email: string, phone: string, data_hour: Date): Promise<IQueryResult> => {
		try {
			const responseQuerySelectDatabase = await this.searchSchedulingAdapter.selectDb();
			if (responseQuerySelectDatabase) {
				const { data_hour: _data_hour, name: _name } = responseQuerySelectDatabase;
				const { hours, day, minutes, month, year } = this.formatDataHours.format(_data_hour);
				console.log(hours)
				console.log(minutes)
			}
			const responseQueryInsertDatabase: IQueryResult = await this.createSchedulingAdapter.insertDb(
				name,
				email,
				phone,
				data_hour
			);
			return responseQueryInsertDatabase;
		} catch (error) {
			throw error as Error;
		}
	};
}
