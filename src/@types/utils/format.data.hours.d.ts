export interface IFormatDataHours {
	format(data_hour: Date): IResponseFormatDataHours;
}
export type IResponseFormatDataHours = {
	hours: number;
	minutes: number;
	year: number;
	month: number;
	day: number;
};
