import { IVehicleProps, Vehicle } from 'src/domain/vehicle/vehicle';

export interface IVehicleRepository {
	createVehicle(request: IVehicleProps): Promise<Vehicle>; // Crear un vehículo
	getVehicleById(id: string): Promise<Vehicle | null>; // Obtener un vehículo por su ID
	getVehicleByLicensePlate(licensePlate: string): Promise<Vehicle | null>; // Obtener un vehículo por su licensePlate
	getAllVehicles(): Promise<Vehicle[]>; // Obtener todos los vehículos
	updateVehicle(id: string, update: Partial<IVehicleProps>): Promise<Vehicle | null>; // Actualizar un vehículo
	deleteVehicle(id: string): Promise<boolean>; // Eliminar un vehículo
}
