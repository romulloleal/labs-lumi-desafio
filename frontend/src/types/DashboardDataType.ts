import { ChartDataType } from './ChartType';

export type DashboardDataType = {
	consumo: ChartDataType[];
	compensada: ChartDataType[];
	totalGD: ChartDataType[];
	economia: ChartDataType[];
};
