import { IVehicleDb } from 'src/db/interface/vehicle.interface';
import { Vehicle } from 'src/domain/vehicle/vehicle';

export class VehicleMap {
	static fromDbToDomain(vehicle: IVehicleDb): Vehicle {
		return {
			id: vehicle._id,
			make: vehicle.make,
			model: vehicle.model,
			year: vehicle.year,
			category: vehicle.category,
			licensePlate: vehicle.licensePlate,
			registrationDate: vehicle.registrationDate,
			notes: vehicle.notes,
			ownerId: vehicle.ownerId
		} as Vehicle;
	}
}
