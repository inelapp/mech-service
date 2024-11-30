import DeleteRepairLog from './deleteRepairLog';
import { repairLogRepository } from 'src/repositories';

const deleteRepairLog = new DeleteRepairLog(repairLogRepository);

export { deleteRepairLog };
