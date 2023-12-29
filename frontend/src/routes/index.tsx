import { Navigate, Route, Routes as Router } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Invoices } from '../pages/Invoices';

const Routes = () => {
	return (
		<Router>
			<Route path="/" element={<Dashboard />} />
			<Route path="/invoices" element={<Invoices />} />

			<Route path="*" element={<Navigate to="/" />} />
		</Router>
	);
};

export default Routes;
