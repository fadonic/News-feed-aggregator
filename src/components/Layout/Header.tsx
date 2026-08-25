interface HeaderProps {
	onTogglePreferences: () => void;
}

export function Header({ onTogglePreferences }: HeaderProps) {
	return (
		<header className="sticky top-0 z-20 bg-white border-b border-gray-200">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-900">📰 News Aggregator</h1>
				<button
					type="button"
					onClick={onTogglePreferences}
					className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
				>
					Preferences
				</button>
			</div>
		</header>
	);
}
