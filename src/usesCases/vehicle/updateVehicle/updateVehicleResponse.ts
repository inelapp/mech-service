export interface UpdateVehicleResponseDto {
	id: string;
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes: string | null;
	ownerId: string | null;
}
