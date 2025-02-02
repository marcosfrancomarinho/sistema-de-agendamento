import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { ICheckAppointmentServices } from "../@types/services/check.appointment.services";
import { SearchSchedulingAdapter } from "../repository/search.scheduling.adapter";

export class CheckAppointmentServices implements ICheckAppointmentServices {
	private intervalMinutes: number = 30;
	private currentTime: Date;
	private searchSchedulingAdapter: ISearchSchedulingAdapter;

	constructor(searchSchedulingAdapter: ISearchSchedulingAdapter) {
		this.currentTime = new Date();
		this.searchSchedulingAdapter = searchSchedulingAdapter;
	}
	private pastCheduleChecker = (datahours: Date): void => {
		this.currentTime.setSeconds(0, 0);
		datahours.setSeconds(0, 0);
		if (datahours.getTime() <= this.currentTime.getTime())
			throw new Error("não pode informar uma data passada ou já agendada.");
	};
	private appointmentAvailabilityChecker = (datahours: Date): void => {
		const time: Date = new Date(
			datahours.getFullYear(),
			datahours.getMonth(),
			datahours.getDate(),
			datahours.getHours(),
			datahours.getMinutes(),
			0
		);
		datahours.setSeconds(0, 0);
		time.setMinutes(time.getMinutes() + this.intervalMinutes);
		console.log(`DATA FUTURA ${time.getTime()}`);
		console.log(`DATA AGENDADA ${datahours.getTime()}`);
		if (datahours.getTime() >= time.getTime() && datahours.getTime() <= time.getTime())
			throw new Error("horário de agendamento indisponivel");
	};
	public check = async (dataHourCheduling: Date): Promise<any> => {
		try {
			this.pastCheduleChecker(dataHourCheduling);
			const responseQuerySearchtDatabase: IResponseSearchDataBase[] = await this.searchSchedulingAdapter.selectDb();
			if (responseQuerySearchtDatabase.length === 0) return;
			responseQuerySearchtDatabase.forEach((scheduling) => {
				this.appointmentAvailabilityChecker(scheduling.datahours);
			});
		} catch (error) {
			console.log(error);
		}
	};
}
const search = new SearchSchedulingAdapter();

const check = new CheckAppointmentServices(search);
const date = new Date("2025-02-13T12:40");
check.check(date);
