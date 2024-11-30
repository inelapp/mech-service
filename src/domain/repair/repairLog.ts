import { err, ok, Result } from 'neverthrow';
import { validateRapirLogSchema } from './repairLog.validations';

export interface IRepairLogProps {
	id?: string;
	vehicle: string;
	repairNumber: string;
	technicalReview?: string;
	observation?: string;
	subTotal: number;
	discount?: number;
	total: number;
	paymentType: string;
	repairStatus: string;
}

export class RepairLog {
	id: string;

	vehicle: string;

	repairNumber: string;

	technicalReview?: string;

	observation?: string;

	subTotal: number;

	discount?: number;

	total: number;

	paymentType: string;

	repairStatus: string;

	constructor(props: IRepairLogProps) {
		Object.assign(this, props);
	}

	static create(props: IRepairLogProps): Result<RepairLog, string> {
		const { error } = validateRapirLogSchema(props);
		if (error) {
			const repairLogError = error.details.map((error) => error.message).join('. ');
			return err(repairLogError);
		}
		return ok(new RepairLog(props));
	}
}
