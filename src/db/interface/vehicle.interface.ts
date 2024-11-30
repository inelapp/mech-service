import { Schema } from 'mongoose';

export interface IVehicleDb {
	_id: string | Schema.Types.ObjectId;
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string;
	ownerId: String | Schema.Types.ObjectId | null;
	createdAt: Date;
	updatedAt: Date;
}
