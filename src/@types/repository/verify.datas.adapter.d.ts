export interface IVerifyDatasAdapter {
	checkDatasBodyRequest(name: string, email: string, phone: string, data_hour: Date): Promise<void>;
}
