import { IFormatDataHours, IResponseFormatDataHours } from '../@types/utils/format.data.hours';

export class FormatDataHours implements IFormatDataHours {
	public format = (datahours: Date): IResponseFormatDataHours => {
		const dataStringFormat = new Date(datahours).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'America/Sao_Paulo',
		});
		const [date, time] = dataStringFormat.split(',');
		const [day, month, year] = date.trim().split('/');
		const [hours, minutes] = time.trim().split(':');
		return {
			day: Number(day),
			month: Number(month),
			year: Number(year),
			hours: Number(hours),
			minutes: Number(minutes),
		};
	};
}
