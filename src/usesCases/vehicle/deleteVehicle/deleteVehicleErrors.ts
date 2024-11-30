class VehicleDeleteBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class VehicleNotFoundError extends Error {
	constructor() {
		super('Vehicle not found');
	}
}

export { VehicleDeleteBadRequestError, VehicleNotFoundError };
