import type { ArticleFilters } from '../../hooks/useArticleFilters';
import type { NewsSourceId } from '../../types/article';
import { NEWS_SOURCES } from '../../types/article';
import { CATEGORIES } from '../../config/categories';
import { ToggleChip } from '../Common/ToggleChip';

interface FilterPanelProps {
	filters: ArticleFilters;
	updateFilter: <K extends keyof ArticleFilters>(
		key: K,
		value: ArticleFilters[K],
	) => void;
	onReset: () => void;
}

export function FilterPanel({
	filters,
	updateFilter,
	onReset,
}: FilterPanelProps) {
	function toggleSource(id: NewsSourceId) {
		const next = filters.sources.includes(id)
			? filters.sources.filter((s) => s !== id)
			: [...filters.sources, id];
		updateFilter('sources', next);
	}

	return (
		<section className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-semibold text-gray-900">Filters</h2>
				<button
					type="button"
					onClick={onReset}
					className="text-sm text-blue-600 hover:underline"
				>
					Reset
				</button>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<label className="text-sm">
					<span className="block text-gray-600 mb-1">From</span>
					<input
						type="date"
						value={filters.fromDate}
						onChange={(e) => updateFilter('fromDate', e.target.value)}
						className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm"
					/>
				</label>
				<label className="text-sm">
					<span className="block text-gray-600 mb-1">To</span>
					<input
						type="date"
						value={filters.toDate}
						onChange={(e) => updateFilter('toDate', e.target.value)}
						className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm"
					/>
				</label>
			</div>

			<div>
				<span className="block text-sm text-gray-600 mb-2">Category</span>
				<select
					value={filters.category}
					onChange={(e) => updateFilter('category', e.target.value)}
					className="w-full px-2 py-1.5 rounded-md border border-gray-300 text-sm"
				>
					<option value="">All categories</option>
					{CATEGORIES.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>

			<div>
				<span className="block text-sm text-gray-600 mb-2">Sources</span>
				<div className="flex flex-wrap gap-2">
					{NEWS_SOURCES.map((s) => (
						<ToggleChip
							key={s.id}
							label={s.label}
							active={filters.sources.includes(s.id)}
							onClick={() => toggleSource(s.id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
