import { Link, useLocation } from 'react-router-dom';

const pages = [
	{ title: 'Dashboard', path: '/' },
	{ title: 'Faturas', path: '/invoices' },
];

export const Nav = () => {
	const location = useLocation();
	return (
		<nav className="flex gap-3">
			{pages.map((page) => (
				<Link
					className={`${
						location.pathname === page.path && 'border-b border-b-green-600'
					} brightness-75 hover:brightness-100 font-semibold`}
					to={page.path}
					key={page.path}
				>
					{page.title}
				</Link>
			))}
		</nav>
	);
};
