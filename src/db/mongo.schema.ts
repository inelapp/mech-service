import { model, Schema } from 'mongoose';
import { IUserDb } from './interface';
import { ramdonString } from '../utils';
import { IRoleDb } from './interface/role.interface';
import { IUserRoleDb } from './interface/userRole.interface';
import { encrypt } from '../utils/bcrypt';
import { IVehicleDb } from './interface/vehicle.interface';
import { IRepairLogDb } from './interface/repairLog.interface';

const userSchema = new Schema<IUserDb>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String },
		status: { type: String, required: true, default: 'pending' },
		token: { type: String }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const roleSchema = new Schema<IRoleDb>(
	{
		name: { type: String, required: true },
		permissions: { type: [String], required: true }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const userRoleSchema = new Schema<IUserRoleDb>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const vehicleSchema = new Schema<IVehicleDb>(
	{
		make: { type: String, required: true, trim: true },
		model: { type: String, required: true, trim: true },
		year: { type: Number, required: true, trim: true },
		category: { type: String, required: true, trim: true },
		licensePlate: { type: String, required: true, trim: true, unique: true },
		registrationDate: { type: Date, required: true, trim: true },
		notes: { type: String, trim: true },
		ownerId: { type: Schema.Types.ObjectId, ref: 'Owner' }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const repairLogSchema = new Schema<IRepairLogDb>(
	{
		vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
		repairNumber: { type: String, required: true },
		technicalReview: { type: String },
		observation: { type: String },
		subTotal: { type: Number, required: true },
		discount: { type: Number },
		total: { type: Number, required: true },
		paymentType: { type: String, required: true },
		repairStatus: { type: String, required: true, default: 'pending' }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

userSchema.pre<IUserDb>('save', async function (next) {
	if (!this.token) {
		this.token = ramdonString(25);
	}
	this.password = await encrypt(this.password);
	next();
});

const UserModel = model<IUserDb>('User', userSchema, 'users');
const RoleModel = model<IRoleDb>('Role', roleSchema, 'roles');
const UserRoleModel = model<IUserRoleDb>('UserRole', userRoleSchema, 'user_role');
const VehicleModel = model<IVehicleDb>('Vehicle', vehicleSchema, 'vehicles');
const RepairLogModel = model<IRepairLogDb>('RepairLog', repairLogSchema, 'repair_log');

export { UserModel, RoleModel, UserRoleModel, VehicleModel, RepairLogModel };
