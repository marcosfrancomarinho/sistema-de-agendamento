import { IScheduleData } from "../@types/controllers/create.scheduling";
import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { connectionToDatabase } from "../config/database";

export class SearchSchedulingAdapter implements ISearchSchedulingAdapter {
	private sql = (): string => {
		return `
   SELECT
      name,
      data_hour
   FROM
      scheduling_user`;
	};
	public selectDb = async (): Promise<IResponseSearchDataBase | null> => {
		try {
			const { rows } = await connectionToDatabase.query<IResponseSearchDataBase>(this.sql());
			if (rows.length === 0) return null;
			return rows.at(0) as IResponseSearchDataBase;
		} catch (error) {
			throw error as Error;
		}
	};
}
