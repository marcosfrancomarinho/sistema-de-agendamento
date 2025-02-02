export interface ICreateSchedulingAdapter {
	insertDb(name: string, email: string, phone: string, data_hour: Date): Promise<IQueryResult>;
}
export type IQueryResult = { id: string };
