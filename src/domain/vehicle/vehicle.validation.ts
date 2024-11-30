import Joi from 'joi';
import { IVehicleProps } from './vehicle';

const vehicleSchema = Joi.object<IVehicleProps>({
	make: Joi.string().required(),
	model: Joi.string().required(),
	year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(), // El año debe ser entre 1886 y el año actual
	category: Joi.string().required(),
	licensePlate: Joi.string().max(10).required(),
	registrationDate: Joi.date().required(),
	notes: Joi.string().allow('').optional(),
	ownerId: Joi.string().optional().allow(null) // Permite null si el propietario no está asignado
});

const validateVehicleSchema = (vehicle: IVehicleProps): Joi.ValidationResult<IVehicleProps> => {
	return vehicleSchema.validate(vehicle, { abortEarly: false });
};

const updateVehicleSchema = vehicleSchema.fork(Object.keys(vehicleSchema.describe().keys), (schema) =>
	schema.optional()
);

const validateUpdateVehicleSchema = (update: Partial<IVehicleProps>): Joi.ValidationResult<Partial<IVehicleProps>> => {
	return updateVehicleSchema.validate(update, { abortEarly: false });
};

export { validateVehicleSchema, validateUpdateVehicleSchema };
