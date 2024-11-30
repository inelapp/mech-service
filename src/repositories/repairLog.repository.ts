import { IRepairLogProps, RepairLog } from 'src/domain/repair/repairLog';

export interface IRepairLogRepository {
	createRepairLog(request: IRepairLogProps): Promise<RepairLog>;
	getRepairLog(page: number, limit: number, filters?: any): Promise<RepairLog[]>;
	updateRepairLog(request: IRepairLogProps): Promise<RepairLog | null>;
	deleteRepairLog(id: string): Promise<boolean | null>;
}
