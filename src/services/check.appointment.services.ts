import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { ICheckAppointmentServices } from "../@types/services/check.appointment.services";

export class CheckAppointmentServices implements ICheckAppointmentServices {
	private serviceTime: number = 30;
	private currentHours: Date;
	private searchSchedulingAdapter: ISearchSchedulingAdapter;

	constructor(searchSchedulingAdapter: ISearchSchedulingAdapter) {
		this.currentHours = new Date();
		this.searchSchedulingAdapter = searchSchedulingAdapter;
	}
	private pastsCheduleChecker = (scheduledDateAndTimes: Date): void => {
		this.currentHours.setSeconds(0, 0);
		if (scheduledDateAndTimes.getTime() <= this.currentHours.getTime())
			throw new Error("não pode informar uma data passada ou já agendada.");
	};
	private reserveTime = (scheduledDateAndTimes: Date, indice: number) => {
		const time: Date = new Date(
			scheduledDateAndTimes.getFullYear(),
			scheduledDateAndTimes.getMonth(),
			scheduledDateAndTimes.getDate(),
			scheduledDateAndTimes.getHours(),
			scheduledDateAndTimes.getMinutes(),
			0
		);
		time.setMinutes(time.getMinutes() + this.serviceTime * indice);
		return time;
	};
	private businessHoursPicker = (requestedDateAndTime: Date): void => {
		//logica referente aos horario comercial de funcionamento
	};
	private appointmentAvailabilityChecker = (requestedDateAndTime: Date, scheduledDateAndTimes: Date): void => {
		scheduledDateAndTimes.setSeconds(0, 0);
		const alreadyBusyHours: Date = this.reserveTime(scheduledDateAndTimes, 1);
		const unavailableHours: Date = this.reserveTime(scheduledDateAndTimes, -1);
		if (
			requestedDateAndTime.getTime() <= alreadyBusyHours.getTime() &&
			requestedDateAndTime.getTime() >= unavailableHours.getTime()
		) {
			throw new Error("horário de agendamento indisponível ou ocupado");
		}
	};
	public check = async (scheduledDateAndTimes: Date): Promise<boolean> => {
		try {
			scheduledDateAndTimes.setSeconds(0, 0);
			this.pastsCheduleChecker(scheduledDateAndTimes);
			const responseQuerySearchDatabase: IResponseSearchDataBase[] = await this.searchSchedulingAdapter.selectDb();
			if (responseQuerySearchDatabase.length === 0) return true;
			for (const { datahours } of responseQuerySearchDatabase) {
				this.appointmentAvailabilityChecker(datahours, scheduledDateAndTimes);
			}
			return true;
		} catch (error) {
			throw error as Error;
		}
	};
}
