import { useState } from 'react';
import { Card } from '../components/Card';
import { SearchComponent } from '../components/Search';
import debounce from 'lodash.debounce';
import { api } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { InvoiceType } from '../types/InvoiceType';

export const Invoices = () => {
	const [customerNumber, setCustomerNumber] = useState('');

	const { data: invoices } = useQuery({
		queryKey: ['invoices', [customerNumber]],
		queryFn: async () => {
			const { data } = await api.get<InvoiceType[]>('/invoices', {
				params: { customer_number: customerNumber },
			});

			return data;
		},
	});

	const downloadFile = async (id: string) => {
		const { data } = await api.get<string>(`/invoices/downloadInvoice/${id}`);

		const blob = new Blob([data], { type: 'application/pdf' });
		window.open(URL.createObjectURL(blob));
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

				{/* above 768px*/}
				<div className="hidden md:flex">
					<table className="table-auto w-full border-separate  border-spacing-y-3">
						<thead className="text-left text-gray-300 tracking-wider">
							<tr>
								<th>Cliente</th>
								<th>Nº Cliente</th>
								<th>Nº Instalação</th>
								<th>Referência</th>
								<th>Vencimento</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{invoices?.map((invoice) => (
								<tr className="bg-card rounded text-gray-100" key={invoice.id}>
									<td>{invoice.customer.name}</td>
									<td>{invoice.customer.customer_number}</td>
									<td>{invoice.customer.install_number}</td>
									<td>{invoice.reference}</td>
									<td>
										{new Intl.DateTimeFormat('pt-BR', {
											dateStyle: 'short',
											timeZone: 'UTC',
										}).format(new Date(invoice.due_date))}
									</td>
									<td>
										<button
											className="bg-info rounded-sm px-2 py-1"
											onClick={() => downloadFile(invoice.id)}
										>
											Download
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* below 768px*/}
				<div className="flex flex-col md:hidden">
					{invoices?.map((invoice) => (
						<div
							className="border-b border-b-white/10 p-4 flex flex-col"
							key={invoice.id}
						>
							<span>
								<b>{invoice.customer.name}</b>
							</span>
							<span>
								<b>Nº cliente:</b> {invoice.customer.customer_number}
							</span>
							<span>
								<b>Nº instalação:</b> {invoice.customer.install_number}
							</span>
							<span>
								<b>Referência:</b> {invoice.reference}
							</span>
							<span>
								<b>Vencimento:</b>{' '}
								{new Intl.DateTimeFormat('pt-BR', {
									dateStyle: 'short',
									timeZone: 'UTC',
								}).format(new Date(invoice.due_date))}
							</span>
							<div>
								<button
									className="bg-info rounded-sm px-2 py-1"
									onClick={() => downloadFile(invoice.id)}
								>
									Download
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};
