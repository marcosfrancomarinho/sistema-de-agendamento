import { IScheduleData } from "../@types/controllers/create.scheduling";
import { IVerifyDatasAdapter } from "../@types/repository/verify.datas.adapter";
import Joi, { ValidationError } from "joi";

export class VerifyDatasAdapter implements IVerifyDatasAdapter {
	public checkDatasBodyRequest = async (name: string, email: string, phone: string, data_hour: Date): Promise<void> => {
		try {
			const schema = Joi.object<IScheduleData>({
				name: Joi.string()
					.trim()
					.required()
					.empty()
					.max(50)
					.regex(/^[A-Za-zÀ-ÿ]+$/)
					.message("nome do usuário inválido")
					.label("nome do usuário"),
				email: Joi.string().trim().required().empty().email().label("email do usuário"),
				phone: Joi.string()
					.trim()
					.required()
					.empty()
					.regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)
					.message("O número de telefone não é válido")
					.label("telefone do usuário"),
				data_hour: Joi.string()
					.trim()
					.required()
					.empty()
					.regex(/^(?:\d{4})\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01]) (?:[01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
					.message("A data com hora é obrigatória e deve ser no formato 'ano/mês/dia horas:minutos:segundos'")
					.label("data e hora do agendamento do usuário"),
			});
			await schema.validateAsync({ name, email, phone, data_hour });
		} catch (error) {
			const { message } = (error as ValidationError).details[0];
			throw new Error(message);
		}
	};
}
