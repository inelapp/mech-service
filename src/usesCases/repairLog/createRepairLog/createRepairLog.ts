import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { CreateRepairLogResponseDto } from './createRepairLogResponseDto';
import {
	RepairLogCreateBadRequestError,
	RepairLogCreateVehicleInvalidObjectIdError,
	RepairLogCreateVehicleNotFoundError
} from './createRepairLogErrors';
import { CreateRepairLogRequestDto } from './createRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLog } from 'src/domain/repair/repairLog';
import { isValidObjectId } from 'mongoose';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';

type Response = Result<
	CreateRepairLogResponseDto,
	RepairLogCreateBadRequestError | RepairLogCreateVehicleInvalidObjectIdError | RepairLogCreateVehicleNotFoundError
>;

class CreateRepairLog implements UseCase<CreateRepairLogRequestDto, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	private readonly vehicleRepository: IVehicleRepository;

	constructor(repairLogRepo: IRepairLogRepository, vehicleRepo: IVehicleRepository) {
		this.repairLogRepository = repairLogRepo;
		this.vehicleRepository = vehicleRepo;
	}

	async execute(request: CreateRepairLogRequestDto, service?: any): Promise<Response> {
		try {
			const repairLogInstanceOrError = RepairLog.create(request);
			if (repairLogInstanceOrError.isErr()) {
				return err(new RepairLogCreateBadRequestError(repairLogInstanceOrError.error));
			}
			if (!isValidObjectId(request.vehicle)) {
				return err(new RepairLogCreateVehicleInvalidObjectIdError());
			}
			const vehicleExist = await this.vehicleRepository.getVehicleById(repairLogInstanceOrError.value.vehicle);
			if (!vehicleExist) {
				return err(new RepairLogCreateVehicleNotFoundError());
			}
			const result = await this.repairLogRepository.createRepairLog(repairLogInstanceOrError.value);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateRepairLog;
