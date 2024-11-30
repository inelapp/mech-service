import { Router } from 'express';
import { VehicleController } from 'src/controllers/vehicle/vehicle.controller';

class VehicleRouter {
	router: Router;

	controller: VehicleController;

	constructor() {
		this.router = Router();
		this.controller = new VehicleController();
		this.routes();
	}

	routes() {
		this.router.route('/vehicle/create').post(this.controller.createVehicle.bind(this.controller));
		this.router.route('/vehicles').get(this.controller.getAllVehicles.bind(this.controller));
		this.router.route('/vehicle/:id').put(this.controller.updateVehicle.bind(this.controller));
		this.router.route('/vehicle/:id').delete(this.controller.deleteVehicle.bind(this.controller));
	}
}

export default new VehicleRouter().router;
