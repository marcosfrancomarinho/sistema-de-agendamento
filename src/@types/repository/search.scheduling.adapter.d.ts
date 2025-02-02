import { IScheduleData } from "../controllers/create.scheduling";

export type IResponseSearchDataBase = Pick<IScheduleData, "datahours" | "name">;

export interface ISearchSchedulingAdapter {
	selectDb(): Promise<IResponseSearchDataBase[]>;
}
