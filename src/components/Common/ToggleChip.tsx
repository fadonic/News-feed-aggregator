interface ToggleChipProps {
	label: string;
	active: boolean;
	onClick: () => void;
}

/**
 * Shared pill-style toggle used for source/category/author selection in
 * both the filter panel and the preferences panel — avoids duplicating
 * this markup/styling in two places (DRY).
 */
export function ToggleChip({ label, active, onClick }: ToggleChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
				active
					? 'bg-blue-600 text-white border-blue-600'
					: 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
			}`}
		>
			{label}
		</button>
	);
}
