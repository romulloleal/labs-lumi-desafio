import { useQuery } from '@tanstack/react-query';
import { ChartComponent } from '../components/Chart';
import { ChartType } from '../types/ChartType';
import { api } from '../services/api';
import { DashboardDataType } from '../types/DashboardDataType';
import { Card } from '../components/Card';
import { SearchComponent } from '../components/Search';
import { useState } from 'react';
import debounce from 'lodash.debounce';

export const Dashboard = () => {
	const [customerNumber, setCustomerNumber] = useState('');

	const { data: dashboardValues } = useQuery({
		queryKey: ['dashboardValues', [customerNumber]],
		queryFn: async () => {
			const { data } = await api.get<DashboardDataType>('/invoices/dashboard', {
				params: { customer_number: customerNumber },
			});

			return data;
		},
	});

	const energia: ChartType = {
		datasets: [
			{
				label: 'Consumo de Energia Elétrica (kwh)',
				data: dashboardValues?.consumo || [],
				borderColor: 'rgba(17,34,136,1)',
				backgroundColor: 'rgba(17,34,136,1)',
			},
			{
				label: 'Energia Compensada (kwh)',
				data: dashboardValues?.compensada || [],
				borderColor: 'rgba(25,77,51,1)',
				backgroundColor: 'rgba(25,77,51,1)',
			},
		],
	};
	const valores: ChartType = {
		datasets: [
			{
				label: 'Valor Total sem GD (R$)',
				data: dashboardValues?.totalGD || [],
				borderColor: 'rgba(17,34,136,1)',
				backgroundColor: 'rgba(17,34,136,1)',
			},
			{
				label: 'Economia GD (R$)',
				data: dashboardValues?.economia || [],
				borderColor: 'rgba(25,77,51,1)',
				backgroundColor: 'rgba(25,77,51,1)',
			},
		],
	};

	const debounceSearch = debounce(
		(value: string) => setCustomerNumber(value),
		1000
	);

	return (
		<Card title="Dashboard">
			<div className="flex flex-col gap-5 w-full">
				<div className="ml-auto">
					<SearchComponent label="Número do cliente" search={debounceSearch} />
				</div>
				<div className="flex flex-col lg:flex-row">
					<div className="h-96 w-full lg:w-1/2">
						<ChartComponent data={energia} title="Energia (kWh)" />
					</div>
					<div className="h-96 w-full lg:w-1/2">
						<ChartComponent data={valores} title="Valores Monetários (R$)" />
					</div>
				</div>
			</div>
		</Card>
	);
};
