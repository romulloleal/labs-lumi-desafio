import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	Title,
	LineController,
	BarController,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { ChartType } from '../../types/ChartType';
ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	Title,
	LineController,
	BarController
);

export const ChartComponent = ({
	title,
	data,
}: {
	title: string;
	data: ChartType;
}) => {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: title,
			},
		},
		parsing: {
			xAxisKey: 'id',
			yAxisKey: 'value',
		},
	};
	return <Line options={options} data={data} />;
};
