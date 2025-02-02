export interface ICheckAppointmentServices {
	check(dataHoursCheduling: Date): Promise<any>;
}
