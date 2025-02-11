import { ICreateSchedulingAdapter, IQueryResult } from '../@types/repository/create.scheduling';
import { ICheckAppointmentServices } from '../@types/services/check.appointment.services';
import { ICreateSchedulingServices } from '../@types/services/create.scheduling.services';

export class CreateSchedulingServices implements ICreateSchedulingServices {
	constructor(
		private createSchedulingAdapter: ICreateSchedulingAdapter,
		private checkAppointmentServices: ICheckAppointmentServices
	) {}
	
	public add = async (name: string, email: string, phone: string, datahours: Date): Promise<IQueryResult> => {
		try {
			await this.checkAppointmentServices.check(datahours);
			const responseQueryInsertDatabase = await this.createSchedulingAdapter.insertDb(name, email, phone, datahours);
			return responseQueryInsertDatabase;
		} catch (error) {
			throw error as Error;
		}
	};
}
