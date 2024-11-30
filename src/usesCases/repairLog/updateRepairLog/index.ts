import { repairLogRepository, vehicleRepository } from 'src/repositories';
import UpdateRepairLog from './updateRepairLog';

const updateRepairLog = new UpdateRepairLog(repairLogRepository, vehicleRepository);

export { updateRepairLog };
