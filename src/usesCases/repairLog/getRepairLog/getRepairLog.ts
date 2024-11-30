import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { GetRepairLogResponseDTO } from './getRepairLogResponseDto';
import { GetRepairLogRequestDTO } from './getRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLogGetLimitConvertionError, RepairLogGetPageConvertionError } from './getRepairLogErrors';

interface IFilter {
	paymentType?: string;
	repairStatus?: string;
}

type Response = Result<GetRepairLogResponseDTO[], RepairLogGetPageConvertionError | RepairLogGetLimitConvertionError>;

class GetRepairLog implements UseCase<GetRepairLogRequestDTO, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	constructor(repairLogRepo: IRepairLogRepository) {
		this.repairLogRepository = repairLogRepo;
	}

	async execute(request: GetRepairLogRequestDTO, service?: any): Promise<Response> {
		try {
			const { page, limit, filters } = request;
			const pageConverted = page ? Number(page) : 1;
			const limitConverted = limit ? Number(limit) : 10;
			if (isNaN(pageConverted)) {
				return err(new RepairLogGetPageConvertionError());
			}
			if (isNaN(limitConverted)) {
				return err(new RepairLogGetLimitConvertionError());
			}

			const query: IFilter = {};
			if (filters) {
				if (filters.paymentType) {
					query.paymentType = filters.paymentType;
				}
				if (filters.repairStatus) {
					query.repairStatus = filters.repairStatus;
				}
			}

			const result = await this.repairLogRepository.getRepairLog(pageConverted, limitConverted, query);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default GetRepairLog;
