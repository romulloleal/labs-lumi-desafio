type SearchType = {
	search: (value: string) => void;
	label: string;
};

export const SearchComponent = ({ search, label }: SearchType) => {
	return (
		<>
			<input
				className="bg-transparent border border-white/10 rounded-sm py-1 px-2"
				onChange={(e) => search(e.target.value)}
				placeholder={label}
			/>
		</>
	);
};
