export interface GetRepairLogRequestDTO {
	page?: string;
	limit?: string;
	filters?: {
		paymentType?: string;
		repairStatus?: string;
	};
}
