import { err, ok, Result } from 'neverthrow';
import { UseCase } from './../../../utils';
import { CreateVehicleRequestDto } from './createVehicleRequestDto';
import {
	VehicleOwnerNotFoundError,
	VehicleAlreadyRegisteredError,
	VehicleCreateBadRequestError,
	VehicleInvalidLicensePlateError,
	VehicleInvalidYearError
} from './createVehicleErrors';
import { Vehicle } from 'src/domain/vehicle/vehicle';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';
import { CreateVehicleResponseDto } from './createVehicleResponse';

type Response = Result<
	CreateVehicleResponseDto,
	| VehicleCreateBadRequestError
	| VehicleOwnerNotFoundError
	| VehicleAlreadyRegisteredError
	| VehicleInvalidLicensePlateError
	| VehicleInvalidYearError
>;

class CreateVehicle implements UseCase<CreateVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: CreateVehicleRequestDto, service?: any): Promise<Response> {
		try {
			const vehicleInstanceOrError = Vehicle.create(request);
			if (vehicleInstanceOrError.isErr()) {
				return err(new VehicleCreateBadRequestError(vehicleInstanceOrError.error));
			}
			//verificar si el vehiculo existe
			const existVehicle = await this.vehicleRepository.getVehicleByLicensePlate(
				vehicleInstanceOrError.value.licensePlate
			);
			if (existVehicle) {
				return err(new VehicleAlreadyRegisteredError());
			}
			// Crear el vehículo en el repositorio
			const result = await this.vehicleRepository.createVehicle(vehicleInstanceOrError.value);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateVehicle;
