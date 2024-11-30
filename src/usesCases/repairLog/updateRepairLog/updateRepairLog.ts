import { err, ok, Result } from 'neverthrow';
import { UpdateRepairLogResponseDto } from './updateRepairLogResponseDto';
import {
	RepairLogUpdateBadRequestError,
	RepairLogUpdateInvalidIdError,
	RepairLogUpdateLogNotFoundError,
	RepairLogUpdateVehicleNotFoundError
} from './updateRepairLogErrors';
import { UseCase } from 'src/utils';
import { UpdateRepairLogRequestDto } from './updateRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLog } from 'src/domain/repair/repairLog';
import { isValidObjectId } from 'mongoose';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';

type Response = Result<
	UpdateRepairLogResponseDto,
	| RepairLogUpdateBadRequestError
	| RepairLogUpdateLogNotFoundError
	| RepairLogUpdateInvalidIdError
	| RepairLogUpdateVehicleNotFoundError
>;

class UpdateRepairLog implements UseCase<UpdateRepairLogRequestDto, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	private readonly vehicleRepository: IVehicleRepository;

	constructor(repairLogRepo: IRepairLogRepository, vehicleRepo: IVehicleRepository) {
		this.repairLogRepository = repairLogRepo;
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: UpdateRepairLogRequestDto, service?: any): Promise<Response> {
		try {
			const repairLogInstanceOrError = RepairLog.create(request);
			if (repairLogInstanceOrError.isErr()) {
				return err(new RepairLogUpdateBadRequestError(repairLogInstanceOrError.error));
			}
			if (!isValidObjectId(repairLogInstanceOrError.value.id)) {
				return err(new RepairLogUpdateInvalidIdError());
			}
			const vehicleExist = await this.vehicleRepository.getVehicleById(repairLogInstanceOrError.value.vehicle);
			if (!vehicleExist) {
				return err(new RepairLogUpdateVehicleNotFoundError());
			}

			const result = await this.repairLogRepository.updateRepairLog(repairLogInstanceOrError.value);
			if (!result) {
				return err(new RepairLogUpdateLogNotFoundError());
			}
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default UpdateRepairLog;
