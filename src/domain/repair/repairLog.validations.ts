import Joi from 'joi';
import { IRepairLogProps } from './repairLog';

const repairLogSchema = Joi.object<IRepairLogProps>({
	id: Joi.string().optional(),
	vehicle: Joi.string().required(),
	repairNumber: Joi.string().required(),
	technicalReview: Joi.string().optional(),
	observation: Joi.string().optional(),
	subTotal: Joi.number().required(),
	discount: Joi.number().optional(),
	total: Joi.number().required(),
	paymentType: Joi.string().required(),
	repairStatus: Joi.string().optional().valid('complete', 'in progress', 'pending', 'cancelled')
});

const validateRapirLogSchema = (repairLog: IRepairLogProps): Joi.ValidationResult<IRepairLogProps> => {
	return repairLogSchema.validate(repairLog, { abortEarly: false });
};

export { validateRapirLogSchema };
