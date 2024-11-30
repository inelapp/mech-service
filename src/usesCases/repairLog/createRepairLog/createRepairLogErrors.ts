class RepairLogCreateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}
class RepairLogCreateVehicleInvalidObjectIdError extends Error {
	constructor() {
		super('Invalid object id');
	}
}
class RepairLogCreateVehicleNotFoundError extends Error {
	constructor() {
		super('Vehicle not found');
	}
}

export {
	RepairLogCreateBadRequestError,
	RepairLogCreateVehicleInvalidObjectIdError,
	RepairLogCreateVehicleNotFoundError
};
