import { IScheduleData } from "../@types/controllers/create.scheduling";
import { IVerifyDatasAdapter } from "../@types/repository/verify.datas.adapter";
import Joi, { ValidationError } from "joi";

export class VerifyDatasAdapter implements IVerifyDatasAdapter {
	public checkDatasBodyRequest = async (name: string, email: string, phone: string, datahours: Date): Promise<void> => {
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
				datahours: Joi.string()
					.trim()
					.required()
					.empty()
					.isoDate()
					.message("A data com hora é obrigatória e deve ser no formato ISO ex: 2025-02-13T12:40")
					.label("data e hora do agendamento do usuário"),
			});
			await schema.validateAsync({ name, email, phone, datahours });
		} catch (error) {
			const { message } = (error as ValidationError).details[0];
			throw new Error(message);
		}
	};
}
