import { CustomerType } from './CustomerType';

export type InvoiceType = {
	id: string;
	customer_id: string;
	reference: string;
	reference_date: Date;
	due_date: Date;
	ee_kwh: number;
	ee_value: number;
	scee_kwh: number;
	scee_value: number;
	gdi_kwh: number;
	gdi_value: number;
	cipm: number;
	value: number;
	barcode: string;
	file: string;
	createdAt: Date;
	updatedAt: Date;
	customer: CustomerType;
};
