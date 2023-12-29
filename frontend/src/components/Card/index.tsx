import { ReactNode } from 'react';

export const Card = ({
	title,
	children,
}: {
	title?: string;
	children: ReactNode;
}) => {
	return (
		<div className="bg-white/10 rounded-md p-4">
			<div className="font-bold text-2xl">{title}</div>
			{children}
		</div>
	);
};
