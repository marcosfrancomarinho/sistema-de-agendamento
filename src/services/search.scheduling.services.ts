import { IResponseSearchDataBase, ISearchSchedulingAdapter } from '../@types/repository/search.scheduling.adapter';
import { ISearchSchedulingServices } from '../@types/services/search.scheduling.services';

export class SearchSchedulingServices implements ISearchSchedulingServices {
	constructor(private searchSchedulingAdapter: ISearchSchedulingAdapter) {}
	public finOne = async (id: number): Promise<IResponseSearchDataBase> => {
		try {
			const responseQuerySearchDatabaseOne = (await this.searchSchedulingAdapter.selectDbOne(id)) as IResponseSearchDataBase;
			if (!responseQuerySearchDatabaseOne) throw new Error('scheduling not found');
			return responseQuerySearchDatabaseOne;
		} catch (error) {
			throw error as Error;
		}
	};
	public findAll = async (): Promise<IResponseSearchDataBase[]> => {
		try {
			const responseQuerySearchDatabase: IResponseSearchDataBase[] = await this.searchSchedulingAdapter.selectDb();
			return responseQuerySearchDatabase;
		} catch (error) {
			throw error as Error;
		}
	};
}