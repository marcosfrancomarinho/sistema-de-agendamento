import { ICreateSchedulingAdapter, IQueryResult } from "../@types/integrations/create.scheduling";
import { connectionToDatabase } from "../config/database";
export class CreteSchedulingAdapter implements ICreateSchedulingAdapter {
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
	public insertNewSchedule = async (name: string, email: string, phone: string, data_hour: string): Promise<IQueryResult> => {
		try {
			const { rows } = await connectionToDatabase.query<IQueryResult>(this.sql(), [name, email, phone, data_hour]);
			return rows.at(0) as IQueryResult;
		} catch (error) {
			throw error as Error;
		}
	};
}
