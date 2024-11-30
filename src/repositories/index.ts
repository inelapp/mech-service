import { RepairLogImplRepository } from './impl/repairLogImplRepository';
import { UserImplRepository } from './impl/userImplRepository';
import { VehicleImplRepository } from './impl/vehicleImplRepository';
import { IUserRepository } from './user.repossitory';
import { IRepairLogRepository } from './repairLog.repository';

const userRepository = new UserImplRepository();
const vehicleRepository = new VehicleImplRepository();
const repairLogRepository = new RepairLogImplRepository();

export { userRepository, IUserRepository, vehicleRepository, repairLogRepository, IRepairLogRepository };
