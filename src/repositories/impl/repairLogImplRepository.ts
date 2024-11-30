import { IRepairLogProps, RepairLog } from 'src/domain/repair/repairLog';
import { IRepairLogRepository } from '../repairLog.repository';
import { RepairLogModel } from 'src/db/mongo.schema';
import { RepairLogMap } from 'src/mappers/repairLogMap';

export class RepairLogImplRepository implements IRepairLogRepository {
	private readonly repairLogModel: typeof RepairLogModel;

	constructor() {
		this.repairLogModel = RepairLogModel;
	}

	async createRepairLog(request: IRepairLogProps): Promise<RepairLog> {
		try {
			const {
				vehicle,
				repairNumber,
				technicalReview,
				observation,
				subTotal,
				discount,
				total,
				paymentType,
				repairStatus
			} = request;

			const newRepairLog = new this.repairLogModel({
				vehicle,
				repairNumber,
				technicalReview,
				observation,
				subTotal,
				discount,
				total,
				paymentType,
				repairStatus
			});
			await newRepairLog.save();
			return RepairLogMap.fromDbToDomain(newRepairLog);
		} catch (error) {
			throw error;
		}
	}

	async getRepairLog(page: number, limit: number, filters?: any): Promise<RepairLog[]> {
		try {
			const repairLogList = await this.repairLogModel
				.find(filters)
				.skip((page - 1) * limit)
				.limit(limit);
			return repairLogList.map((e) => RepairLogMap.fromDbToDomain(e));
		} catch (error) {
			throw error;
		}
	}

	async updateRepairLog(request: IRepairLogProps): Promise<RepairLog | null> {
		try {
			const {
				id,
				vehicle,
				repairNumber,
				technicalReview,
				observation,
				subTotal,
				discount,
				total,
				paymentType,
				repairStatus
			} = request;

			const repairLog = await this.repairLogModel.findById(id);

			if (!repairLog) {
				return null;
			}

			const updatedRepairLog = await this.repairLogModel.findByIdAndUpdate(
				id,
				{
					vehicle,
					repairNumber,
					technicalReview,
					observation,
					subTotal,
					discount,
					total,
					paymentType,
					repairStatus
				},
				{ new: true }
			);
			return RepairLogMap.fromDbToDomain(updatedRepairLog!);
		} catch (error) {
			throw error;
		}
	}

	async deleteRepairLog(id: string): Promise<boolean> {
		try {
			const result = await this.repairLogModel.deleteOne({ _id: id });
			return result.deletedCount > 0;
		} catch (error) {
			throw error;
		}
	}
}
