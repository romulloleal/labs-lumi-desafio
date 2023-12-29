export type DashboardDataType = {
  consumo: ChartType[];
  compensada: ChartType[];
  totalGD: ChartType[];
  economia: ChartType[];
};

export type ChartType = {
  id: string;
  value: string | number;
};
