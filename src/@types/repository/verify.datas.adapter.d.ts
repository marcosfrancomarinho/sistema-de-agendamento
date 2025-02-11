export interface IVerifyDatasAdapter {
	checkDatasBodyRequest(name: string, email: string, phone: string, datahours: Date): Promise<void>;
	checkIDBodyRequest(id: number): Promise<void>;
}
