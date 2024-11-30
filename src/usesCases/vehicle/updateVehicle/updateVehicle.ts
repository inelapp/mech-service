import { Result, ok, err } from 'neverthrow';
import { UseCase } from '../../../utils';
import { UpdateVehicleRequestDto } from './updateVehicleRequestDto';
import { UpdateVehicleResponseDto } from './updateVehicleResponse';
import {
	VehicleUpdateNotFoundError,
	VehicleUpdateBadRequestError,
	VehicleUpdateIdNotValidError
} from './updateVehicleErrors';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';
import { isValidObjectId } from 'mongoose';
import { validateUpdateVehicleSchema } from 'src/domain/vehicle/vehicle.validation';

type Response = Result<UpdateVehicleResponseDto, VehicleUpdateNotFoundError | VehicleUpdateBadRequestError>;

class UpdateVehicle implements UseCase<UpdateVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: UpdateVehicleRequestDto): Promise<Response> {
		const { id, ...updateData } = request;

		try {
			// Verificar si el ID tiene un formato válido
			if (!isValidObjectId(id)) {
				return err(new VehicleUpdateIdNotValidError());
			}

			// Verificar existencia del vehículo
			const existingVehicle = await this.vehicleRepository.getVehicleById(id);
			if (!existingVehicle) {
				return err(new VehicleUpdateNotFoundError());
			}

			// Validar los datos del request
			const { error } = validateUpdateVehicleSchema(updateData);
			if (error) {
				return err(new VehicleUpdateBadRequestError(error.details.map((e) => e.message).join('. ')));
			}

			// Actualizar el vehículo
			const updatedVehicle = await this.vehicleRepository.updateVehicle(id, updateData);
			if (!updatedVehicle) {
				return err(new VehicleUpdateBadRequestError('Failed to update vehicle'));
			}

			return ok(updatedVehicle);
		} catch (error) {
			return err(error);
		}
	}
}

export default UpdateVehicle;
