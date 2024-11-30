import { vehicleRepository } from './../../../repositories';
import CreateVehicle from './createVehicle';

const createVehicle = new CreateVehicle(vehicleRepository);

export { createVehicle };
