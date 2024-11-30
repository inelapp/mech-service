import { IVehicleProps, Vehicle } from 'src/domain/vehicle/vehicle';
import { IVehicleRepository } from '../vehicle.repository';
import { VehicleModel } from '../../db/mongo.schema';
import { ClientSession, connection } from 'mongoose';
import { VehicleMap } from 'src/mappers/vehicleMap';
import { VehicleAlreadyRegisteredError } from 'src/usesCases/vehicle/createVehicle/createVehicleErrors';
import { VehicleUpdateLicensePlateAlreadyAssigned } from 'src/usesCases/vehicle/updateVehicle/updateVehicleErrors';

export class VehicleImplRepository implements IVehicleRepository {
	private readonly vehicleModel: typeof VehicleModel;

	constructor() {
		this.vehicleModel = VehicleModel;
	}

	async getVehicleByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
		try {
			const vehicle = await this.vehicleModel.findOne({ licensePlate });
			return vehicle ? VehicleMap.fromDbToDomain(vehicle) : null;
		} catch (error) {
			throw error;
		}
	}

	async getVehicleById(id: string): Promise<Vehicle | null> {
		try {
			const vehicle = await this.vehicleModel.findById(id);
			return vehicle ? VehicleMap.fromDbToDomain(vehicle) : null;
		} catch (error) {
			throw error;
		}
	}

	async getAllVehicles(): Promise<Vehicle[]> {
		try {
			const vehicles = await this.vehicleModel.find();
			return vehicles.map((vehicle) => VehicleMap.fromDbToDomain(vehicle));
		} catch (error) {
			throw error;
		}
	}

	async createVehicle(request: IVehicleProps): Promise<Vehicle> {
		try {
			const { make, model, year, category, licensePlate, registrationDate, notes, ownerId } = request;
			const newVehicle = new this.vehicleModel({
				make,
				model,
				year,
				category,
				licensePlate,
				registrationDate,
				notes,
				ownerId
			});
			await newVehicle.save();
			return VehicleMap.fromDbToDomain(newVehicle);
		} catch (error) {
			throw error;
		}
	}

	async updateVehicle(id: string, update: Partial<IVehicleProps>): Promise<Vehicle | null> {
		try {
			// Verifica si se intenta actualizar el `licensePlate`
			if (update.licensePlate) {
				const existingVehicle = await this.vehicleModel.findOne({
					licensePlate: update.licensePlate,
					_id: { $ne: id } // Excluir el vehículo actual
				});
				if (existingVehicle) {
					throw new VehicleUpdateLicensePlateAlreadyAssigned();
				}
			}
			// Realiza la actualización
			const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(id, update, { new: true });
			return updatedVehicle ? VehicleMap.fromDbToDomain(updatedVehicle) : null;
		} catch (error) {
			if (error.message.includes('license plate')) {
				throw new VehicleUpdateLicensePlateAlreadyAssigned(); // Error personalizado
			}
			throw error;
		}
	}

	async deleteVehicle(id: string): Promise<boolean> {
		try {
			const result = await this.vehicleModel.findByIdAndDelete(id);
			return result != null;
		} catch (error) {
			throw error;
		}
	}
}
