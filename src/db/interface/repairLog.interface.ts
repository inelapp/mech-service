import { Schema } from 'mongoose';

export interface IRepairLogDb {
	_id: string | Schema.Types.ObjectId;
	// vehicle: Schema.Types.ObjectId;
	vehicle: string | Schema.Types.ObjectId;
	repairNumber: string;
	technicalReview: string;
	observation: string;
	subTotal: number;
	discount: number;
	total: number;
	paymentType: string;
	repairStatus: string;
}
