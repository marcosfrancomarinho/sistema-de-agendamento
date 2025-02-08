import { ICreateSchedulingAdapter, IQueryResult } from '../@types/repository/create.scheduling';
import { connectionToDatabase } from '../configs/database';
export class CreateSchedulingAdapter implements ICreateSchedulingAdapter {
	private sql: string = 'INSERT INTO scheduling_user (name,email, phone, datahours)VALUES($1,$2,$3,$4) RETURNING id';
	public insertDb = async (name: string, email: string, phone: string, datahours: Date): Promise<IQueryResult> => {
		try {
			const { rows } = await connectionToDatabase.query<IQueryResult>(this.sql, [name, email, phone, datahours]);
			return rows.at(0) as IQueryResult;
		} catch (error) {
			throw error as Error;
		}
	};
}
