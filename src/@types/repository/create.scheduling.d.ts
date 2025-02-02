export interface ICreateSchedulingAdapter {
	insertDb(name: string, email: string, phone: string, datahours: Date): Promise<IQueryResult>;
}
export type IQueryResult = { id: string };
