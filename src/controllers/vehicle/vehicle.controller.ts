import { Request, Response } from 'express';
import { StatusCode } from 'src/types';
import { createVehicle } from 'src/usesCases/vehicle/createVehicle';
import { getAllVehicles } from 'src/usesCases/vehicle/getAllVehicles';
import {
	VehicleAlreadyRegisteredError,
	VehicleCreateBadRequestError
} from 'src/usesCases/vehicle/createVehicle/createVehicleErrors';

import { CreateVehicleRequestDto } from 'src/usesCases/vehicle/createVehicle/createVehicleRequestDto';
import { response } from 'src/utils/response';
import { GetVehicleBadRequestError } from '../../usesCases/vehicle/getAllVehicles/getAllVehiclesErrors';
import { deleteVehicle } from '../../usesCases/vehicle/deleteVehicle';
import { DeleteVehicleRequestDto } from 'src/usesCases/vehicle/deleteVehicle/deleteVehicleResquestDto';
import {
	VehicleDeleteBadRequestError,
	VehicleNotFoundError
} from 'src/usesCases/vehicle/deleteVehicle/deleteVehicleErrors';

export class VehicleController {
	constructor() {
		this.createVehicle = this.createVehicle.bind(this);
		this.getAllVehicles = this.getAllVehicles.bind(this);
		this.deleteVehicle = this.deleteVehicle.bind(this);
	}

	async createVehicle(req: Request, res: Response) {
		const { make, model, year, category, licensePlate, registrationDate, notes, ownerId } =
			req.body as CreateVehicleRequestDto;
		const result = await createVehicle.execute({
			make,
			model,
			year,
			category,
			licensePlate,
			registrationDate,
			notes,
			ownerId
		});

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case VehicleCreateBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case VehicleAlreadyRegisteredError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}

		return response(res, result.value, StatusCode.CREATED);
	}

	async getAllVehicles(_req: Request, res: Response) {
		const result = await getAllVehicles.execute({});
		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case GetVehicleBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.CREATED);
	}

	async deleteVehicle(req: Request, res: Response) {
		const { id } = req.body as DeleteVehicleRequestDto;
		const result = await deleteVehicle.execute({ id });
		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case VehicleDeleteBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case VehicleNotFoundError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}
}
