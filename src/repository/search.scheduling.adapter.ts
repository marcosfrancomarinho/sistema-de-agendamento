import { IResponseSearchDataBase, ISearchSchedulingAdapter } from '../@types/repository/search.scheduling.adapter';
import { connectionToDatabase } from '../configs/database';

export class SearchSchedulingAdapter implements ISearchSchedulingAdapter {
	private sql: { one: string; all: string } = {
		one: 'SELECT * FROM scheduling_user WHERE id=$1',
		all: 'SELECT * FROM scheduling_user',
	};

	public selectDb = async (): Promise<IResponseSearchDataBase[]> => {
		try {
			const { rows } = await connectionToDatabase.query<IResponseSearchDataBase>(this.sql.all);
			return rows;
		} catch (error) {
			throw error as Error;
		}
	};
	
	public selectDbOne = async (id: number): Promise<IResponseSearchDataBase | null> => {
		try {
			const { rows } = await connectionToDatabase.query<IResponseSearchDataBase>(this.sql.one, [id]);
			return rows.at(0) ?? null;
		} catch (error) {
			throw error as Error;
		}
	};
}