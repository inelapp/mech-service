class VehicleCreateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class VehicleInvalidLicensePlateError extends Error {
	constructor() {
		super('Invalid license plate format');
	}
}

class VehicleAlreadyRegisteredError extends Error {
	constructor() {
		super('Vehicle already registered');
	}
}

class VehicleOwnerNotFoundError extends Error {
	constructor() {
		super('Owner not found');
	}
}

class VehicleInvalidYearError extends Error {
	constructor() {
		super('Invalid year: the year must be within a reasonable range');
	}
}

export {
	VehicleCreateBadRequestError,
	VehicleInvalidLicensePlateError,
	VehicleAlreadyRegisteredError,
	VehicleOwnerNotFoundError,
	VehicleInvalidYearError
};
