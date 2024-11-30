class RepairLogDeleteLogNotFoundError extends Error {
	constructor() {
		super('Repair Log not found');
	}
}
class RepairLogDeleteInvalidIdError extends Error {
	constructor() {
		super('Invalid id');
	}
}

export { RepairLogDeleteLogNotFoundError, RepairLogDeleteInvalidIdError };
