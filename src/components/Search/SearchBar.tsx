interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<input
			type="search"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder="Search articles by keyword…"
			aria-label="Search articles"
			className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
		/>
	);
}
