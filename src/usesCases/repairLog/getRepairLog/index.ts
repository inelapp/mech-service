import { repairLogRepository } from 'src/repositories';
import GetRepairLog from './getRepairLog';

const getRepairLog = new GetRepairLog(repairLogRepository);

export { getRepairLog };
