import { repairLogRepository, vehicleRepository } from 'src/repositories';
import CreateRepairLog from './createRepairLog';

const createRepairLog = new CreateRepairLog(repairLogRepository, vehicleRepository);

export { createRepairLog };
