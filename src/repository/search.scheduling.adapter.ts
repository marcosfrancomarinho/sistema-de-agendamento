import { IResponseSearchDataBase, ISearchSchedulingAdapter } from "../@types/repository/search.scheduling.adapter";
import { connectionToDatabase } from "../configs/database";

export class SearchSchedulingAdapter implements ISearchSchedulingAdapter {
	private sql = (): string => {
		return `
		SELECT
			name,
			datahours
		FROM
			scheduling_user`;
	};
	public selectDb = async (): Promise<IResponseSearchDataBase[]> => {
		try {
			const { rows } = await connectionToDatabase.query<IResponseSearchDataBase>(this.sql());
			return rows;
		} catch (error) {
			throw error as Error;
		}
	};
}
