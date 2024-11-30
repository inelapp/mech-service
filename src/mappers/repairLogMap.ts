import { IRepairLogDb } from 'src/db/interface/repairLog.interface';
import { RepairLog } from 'src/domain/repair/repairLog';

export class RepairLogMap {
	static fromDbToDomain(repairLog: IRepairLogDb): RepairLog {
		return {
			id: repairLog._id,
			vehicle: repairLog.vehicle,
			repairNumber: repairLog.repairNumber,
			technicalReview: repairLog.technicalReview,
			observation: repairLog.observation,
			subTotal: repairLog.subTotal,
			discount: repairLog.discount,
			total: repairLog.total,
			paymentType: repairLog.paymentType,
			repairStatus: repairLog.repairStatus
		} as RepairLog;
	}
}
