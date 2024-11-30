class RepairLogUpdateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}
class RepairLogUpdateLogNotFoundError extends Error {
	constructor() {
		super('Repair Log not found');
	}
}
class RepairLogUpdateInvalidIdError extends Error {
	constructor() {
		super('Invalid id');
	}
}
class RepairLogUpdateVehicleNotFoundError extends Error {
	constructor() {
		super('Vehicle not found');
	}
}

export {
	RepairLogUpdateBadRequestError,
	RepairLogUpdateLogNotFoundError,
	RepairLogUpdateInvalidIdError,
	RepairLogUpdateVehicleNotFoundError
};
