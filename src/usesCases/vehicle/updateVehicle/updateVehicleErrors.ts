class VehicleUpdateNotFoundError extends Error {
	constructor() {
		super('Vehicle not found.');
	}
}

class VehicleUpdateIdNotValidError extends Error {
	constructor() {
		super('The provided ID is not valid.');
	}
}

class VehicleUpdateLicensePlateAlreadyAssigned extends Error {
	constructor() {
		super('The license plate is already assigned to another vehicle.');
	}
}

class VehicleUpdateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export {
	VehicleUpdateNotFoundError,
	VehicleUpdateBadRequestError,
	VehicleUpdateIdNotValidError,
	VehicleUpdateLicensePlateAlreadyAssigned
};
