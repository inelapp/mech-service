import { err, ok, Result } from 'neverthrow';
import { DeleteRepairLogResponse } from './deleteRepairLogResponseDto';
import { RepairLogDeleteInvalidIdError, RepairLogDeleteLogNotFoundError } from './deleteRepairLogErrors';
import { UseCase } from 'src/utils';
import { DeleteRepairLogRequest } from './deleteRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { isValidObjectId } from 'mongoose';

type Response = Result<DeleteRepairLogResponse, RepairLogDeleteInvalidIdError | RepairLogDeleteLogNotFoundError>;

class DeleteRepairLog implements UseCase<DeleteRepairLogRequest, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	constructor(repairLogRepo: IRepairLogRepository) {
		this.repairLogRepository = repairLogRepo;
	}

	async execute(request: DeleteRepairLogRequest, service?: any): Promise<Response> {
		try {
			const { id } = request;
			if (!isValidObjectId(id)) {
				return err(new RepairLogDeleteInvalidIdError());
			}
			const result = await this.repairLogRepository.deleteRepairLog(id);

			if (!result) {
				return err(new RepairLogDeleteLogNotFoundError());
			}

			return ok({ message: 'Repair log successfully deleted' });
		} catch (error) {
			return err(error);
		}
	}
}

export default DeleteRepairLog;
