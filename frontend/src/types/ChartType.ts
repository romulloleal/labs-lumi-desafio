import { ChartData, ChartDataset } from 'chart.js';

export type ChartType = Omit<ChartData, 'datasets'> & {
	datasets: Omit<ChartDataset, 'data'>[] &
		{
			data: ChartDataType[];
		}[];
};

export type ChartDataType = {
	id: string;
	value: string | number;
};
