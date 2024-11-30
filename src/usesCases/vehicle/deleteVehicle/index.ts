import { vehicleRepository } from 'src/repositories';
import DeleteVehicle from './deleteVehicle';

const deleteVehicle = new DeleteVehicle(vehicleRepository);

export { deleteVehicle };
