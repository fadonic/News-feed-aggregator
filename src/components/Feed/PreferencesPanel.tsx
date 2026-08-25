import { usePreferences } from '../../context/PreferencesContext';
import { NEWS_SOURCES } from '../../types/article';
import { CATEGORIES } from '../../config/categories';
import { ToggleChip } from '../Common/ToggleChip';

interface PreferencesPanelProps {
	open: boolean;
	onClose: () => void;
}

export function PreferencesPanel({ open, onClose }: PreferencesPanelProps) {
	const { preferences, dispatch } = usePreferences();

	return (
		<>
			{open && (
				<div
					className="fixed inset-0 bg-black/30 z-30"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}
			<aside
				className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-40 shadow-xl transform transition-transform duration-200 ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}
				aria-hidden={!open}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="font-semibold text-gray-900">My Feed Preferences</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close preferences"
						className="text-gray-500 hover:text-gray-800"
					>
						✕
					</button>
				</div>

				<div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
					<p className="text-sm text-gray-500">
						Choose your preferred sources and categories. Your personalized feed
						will prioritize this content.
					</p>

					<div>
						<span className="block text-sm font-medium text-gray-700 mb-2">
							Preferred Sources
						</span>
						<div className="flex flex-wrap gap-2">
							{NEWS_SOURCES.map((s) => (
								<ToggleChip
									key={s.id}
									label={s.label}
									active={preferences.sources.includes(s.id)}
									onClick={() =>
										dispatch({ type: 'TOGGLE_SOURCE', payload: s.id })
									}
								/>
							))}
						</div>
					</div>

					<div>
						<span className="block text-sm font-medium text-gray-700 mb-2">
							Preferred Categories
						</span>
						<div className="flex flex-wrap gap-2">
							{CATEGORIES.map((cat) => (
								<ToggleChip
									key={cat}
									label={cat}
									active={preferences.categories.includes(cat)}
									onClick={() =>
										dispatch({ type: 'TOGGLE_CATEGORY', payload: cat })
									}
								/>
							))}
						</div>
					</div>

					<button
						type="button"
						onClick={() => dispatch({ type: 'RESET' })}
						className="text-sm text-red-600 hover:underline"
					>
						Reset all preferences
					</button>
				</div>
			</aside>
		</>
	);
}
