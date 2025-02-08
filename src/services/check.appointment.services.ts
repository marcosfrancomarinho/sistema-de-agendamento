import { IResponseSearchDataBase, ISearchSchedulingAdapter } from '../@types/repository/search.scheduling.adapter';
import { ICheckAppointmentServices } from '../@types/services/check.appointment.services';

export class CheckAppointmentServices implements ICheckAppointmentServices {
	private readonly SERVICE_TIME: number = 60;
	private readonly MINUTES_IN_ONE_HOUR: number = 60;
	private readonly BUSINESS_HOURS_START: number = 8 * this.MINUTES_IN_ONE_HOUR;
	private readonly BUSINESS_HOURS_END: number = 18 * this.MINUTES_IN_ONE_HOUR;
	private readonly WEEKEND_DAYS: Set<number> = new Set([0, 6]); // Domingo e Sábado

	constructor(private searchSchedulingAdapter: ISearchSchedulingAdapter) {}

	private checkPastSchedule(scheduledDateAndTime: Date): void {
		const currentDateTime: Date = new Date();
		currentDateTime.setSeconds(0, 0);
		if (scheduledDateAndTime.getTime() <= currentDateTime.getTime()) {
			throw new Error('Não é possível agendar um compromisso no passado.');
		}
	}

	private addServiceTime(date: Date, multiplier: number): Date {
		const newDate: Date = new Date(date.getTime());
		newDate.setMinutes(newDate.getMinutes() + this.SERVICE_TIME * multiplier);
		return newDate;
	}

	private checkBusinessHours(requestedDateAndTime: Date): void {
		const day: number = requestedDateAndTime.getDay();
		const totalMinutes: number = requestedDateAndTime.getHours() * this.MINUTES_IN_ONE_HOUR + requestedDateAndTime.getMinutes();

		if (this.WEEKEND_DAYS.has(day)) {
			throw new Error('Fechado nos fins de semana. Aberto de segunda a sexta.');
		}
		if (totalMinutes < this.BUSINESS_HOURS_START || totalMinutes > this.BUSINESS_HOURS_END) {
			throw new Error('Os compromissos só podem ser agendados entre 8:00 e 18:00.');
		}
	}

	private checkAppointmentAvailability(requestedDateAndTime: Date, scheduledDateAndTime: Date): void {
		scheduledDateAndTime.setSeconds(0, 0);
		const busyStart: Date = this.addServiceTime(scheduledDateAndTime, -1);
		const busyEnd: Date = this.addServiceTime(scheduledDateAndTime, 1);

		if (requestedDateAndTime.getTime() >= busyStart.getTime() && requestedDateAndTime.getTime() <= busyEnd.getTime()) {
			throw new Error('Horário do compromisso já está reservado.');
		}
	}

	public async check(scheduledDateAndTime: Date): Promise<boolean> {
		try {
			scheduledDateAndTime.setSeconds(0, 0);
			this.checkPastSchedule(scheduledDateAndTime);
			this.checkBusinessHours(scheduledDateAndTime);

			const responseQuerySearchDatabase: IResponseSearchDataBase[] = await this.searchSchedulingAdapter.selectDb();
			if (responseQuerySearchDatabase.length === 0) return true;

			for (const { datahours } of responseQuerySearchDatabase) {
				this.checkAppointmentAvailability(scheduledDateAndTime, datahours);
			}
			return true;
		} catch (error) {
			throw error as Error;
		}
	}
}
