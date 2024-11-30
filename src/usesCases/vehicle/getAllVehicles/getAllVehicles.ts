import { UseCase } from 'src/utils';

import { err, ok, Result } from 'neverthrow';
import { GetAllVehicleRequestDto } from './getAllVehiclesRequestDto';
import { GetAllVehiclesResponseDto } from './getAllVehiclesResponse';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';
import { GetVehicleBadRequestError } from './getAllVehiclesErrors';

type Response = Result<GetAllVehiclesResponseDto[], GetVehicleBadRequestError>;

class GetAllVehicles implements UseCase<GetAllVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute(_request: GetAllVehicleRequestDto, _service?: any): Promise<Response> {
		try {
			const result = await this.vehicleRepository.getAllVehicles();
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default GetAllVehicles;
