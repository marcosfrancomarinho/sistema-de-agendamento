import { ICreateSchedulingAdapter, IQueryResult } from "../@types/repository/create.scheduling";
import { connectionToDatabase } from "../config/database";
export class CreateSchedulingAdapter implements ICreateSchedulingAdapter {
	private sql = (): string => {
		return `
    INSERT INTO scheduling_user ( 
        name, 
        email,
        phone,
        data_hour
    )VALUES(
        $1,
        $2,
        $3,
        $4
    ) RETURNING id`;
	};
	public insertDb = async (name: string, email: string, phone: string, data_hour: Date): Promise<IQueryResult> => {
		try {
			const { rows } = await connectionToDatabase.query<IQueryResult>(this.sql(), [name, email, phone, data_hour]);
			return rows.at(0) as IQueryResult;
		} catch (error) {
			throw error as Error;
		}
	};
}
