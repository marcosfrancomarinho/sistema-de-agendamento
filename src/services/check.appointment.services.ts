import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { ICheckAppointmentServices } from "../@types/services/check.appointment.services";

export class CheckAppointmentServices implements ICheckAppointmentServices {
	private SERVICE_TIME: number = 30;
	constructor(private searchSchedulingAdapter: ISearchSchedulingAdapter) {}
	private pastsCheduleChecker = (scheduledDateAndTimes: Date): void => {
		const currentHours: Date = new Date();
		currentHours.setSeconds(0, 0);
		if (scheduledDateAndTimes.getTime() <= currentHours.getTime()) throw new Error("não pode informar uma data passada.");
	};
	private reserveTime = (scheduledDateAndTimes: Date, indice: number) => {
		const time: Date = new Date(scheduledDateAndTimes.getTime());
		time.setMinutes(time.getMinutes() + this.SERVICE_TIME * indice);
		return time;
	};
	private businessHoursPicker = (requestedDateAndTime: Date): void => {
		const day: number = requestedDateAndTime.getDay();
		const hours = requestedDateAndTime.getMinutes();
		enum weekBusines {
			saturday = 6,
			sunday = 0,
		}
		enum hoursBusinnes {
			start = 8,
			end = 17,
		}
		if (day === weekBusines.saturday || day === weekBusines.sunday) {
			throw new Error("sábado e domingo está fechado.");
		}
		//ainda falta fazer essa parte
		if (hours < hoursBusinnes.start || hours > hoursBusinnes.end) {
			throw new Error("agendamento apenas das 8h as 17h");
		}
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
			this.businessHoursPicker(scheduledDateAndTimes);
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
