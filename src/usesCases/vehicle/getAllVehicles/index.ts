import { vehicleRepository } from 'src/repositories';
import GetAllVehicles from './getAllVehicles';

const getAllVehicles = new GetAllVehicles(vehicleRepository);

export { getAllVehicles };
