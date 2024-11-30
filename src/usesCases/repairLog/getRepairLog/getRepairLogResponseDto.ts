export interface GetRepairLogResponseDTO {
	id: string;
	vehicle: string;
	repairNumber: string;
	technicalReview?: string;
	observation?: string;
	subTotal: number;
	discount?: number;
	total: number;
	paymentType: string;
	repairStatus: string;
}
