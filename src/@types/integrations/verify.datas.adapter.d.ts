export interface IVerifyDatasAdapter {
	checkDatasBodyRequest(name: string, email: string, phone: string, data_hour: string): Promise<void>;
}
