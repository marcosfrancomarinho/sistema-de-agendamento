import { IScheduleData } from "../controllers/create.scheduling";

export type IResponseSearchDataBase = Pick<IScheduleData, "data_hour" | "name">;

export interface ISearchSchedulingAdapter {
	selectDb(): Promise<IResponseSearchDataBase | null>;
}
