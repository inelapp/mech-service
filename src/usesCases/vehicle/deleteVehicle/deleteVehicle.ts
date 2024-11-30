import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { VehicleDeleteBadRequestError, VehicleNotFoundError } from './deleteVehicleErrors';
import { DeleteVehicleResponseDto } from './deleteVehicleResponseDto';
import { DeleteVehicleRequestDto } from './deleteVehicleResquestDto';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';
import { isValidObjectId } from 'mongoose';

type Response = Result<DeleteVehicleResponseDto, VehicleDeleteBadRequestError | VehicleNotFoundError>;

class DeleteVehicle implements UseCase<DeleteVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vechicleRepo: IVehicleRepository) {
		this.vehicleRepository = vechicleRepo;
	}

	async execute(request: DeleteVehicleRequestDto, service?: any): Promise<Response> {
		try {
			if (!isValidObjectId(request.id)) {
				return err(new VehicleDeleteBadRequestError('The provided ID is not valid.'));
			}
			const vehicleExist = await this.vehicleRepository.getVehicleById(request.id);
			// Validar si el ID es un ObjectId válido
			// si el vehiculo no existe
			if (!vehicleExist) {
				return err(new VehicleNotFoundError());
			}
			//Eliminando Vehiculo
			await this.vehicleRepository.deleteVehicle(request.id);
			return ok({ message: 'Vehicle deleted successfully' });
		} catch (error) {
			return err(new VehicleDeleteBadRequestError(error.message));
		}
	}
}

export default DeleteVehicle;
