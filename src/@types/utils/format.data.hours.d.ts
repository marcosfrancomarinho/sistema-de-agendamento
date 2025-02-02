export interface IFormatDataHours {
	format(datahours: Date): IResponseFormatDataHours;
}
export type IResponseFormatDataHours = {
	hours: number;
	minutes: number;
	year: number;
	month: number;
	day: number;
};
