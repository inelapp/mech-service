class RepairLogGetPageConvertionError extends Error {
	constructor() {
		super('Page must be a number');
	}
}
class RepairLogGetLimitConvertionError extends Error {
	constructor() {
		super('Limit must be a number');
	}
}

export { RepairLogGetPageConvertionError, RepairLogGetLimitConvertionError };
