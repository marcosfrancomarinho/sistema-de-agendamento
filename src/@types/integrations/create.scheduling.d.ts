export interface ICreateSchedulingAdapter {
	insertNewSchedule(name: string, email: string, phone: string, data_hour: string): Promise<IQueryResult>;
}
export type IQueryResult = { id: string };
