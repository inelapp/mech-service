import { ok, err, Result } from 'neverthrow';
import { validateUpdateVehicleSchema, validateVehicleSchema } from './vehicle.validation';
import { VehicleUpdateBadRequestError } from 'src/usesCases/vehicle/updateVehicle/updateVehicleErrors';

export interface IVehicleProps {
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string | null;
	ownerId: string | null;
}

export class Vehicle {
	id: string;

	make: string;

	model: string;

	year: number;

	category: string;

	licensePlate: string;

	registrationDate: Date;

	notes: string | null;

	ownerId: string | null;

	constructor(props: IVehicleProps) {
		Object.assign(this, props);
	}

	static create(props: IVehicleProps): Result<Vehicle, string> {
		const { error } = validateVehicleSchema(props);
		if (error) {
			const vehicleError = error.details.map((error) => error.message).join('. ');
			return err(vehicleError);
		}
		return ok(new Vehicle(props));
	}

	static update(props: IVehicleProps): Result<Vehicle, string> {
		const { error } = validateUpdateVehicleSchema(props);
		if (error) {
			const vehicleError = error.details.map((error) => error.message).join('. ');
			return err(vehicleError);
		}
		return ok(new Vehicle(props));
	}
}
