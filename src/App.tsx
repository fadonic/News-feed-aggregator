import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { SearchBar } from './components/Search/SearchBar';
import { FilterPanel } from './components/Filters/FilterPanel';

import { PreferencesPanel } from './components/Feed/PreferencesPanel';
import { useArticleFilters } from './hooks/useArticleFilters';
import { usePersonalizedQuery } from './hooks/usePersonalizedQuery';
import { useArticles } from './hooks/useArticles';
import { usePreferences } from './context/PreferencesContext';
import { ArticleList } from './components/Article/ArticleList';

function App() {
	const [preferencesOpen, setPreferencesOpen] = useState(false);
	const { preferences } = usePreferences();
	const { filters, debouncedKeyword, updateFilter, resetFilters } =
		useArticleFilters();

	const query = usePersonalizedQuery(filters, debouncedKeyword, preferences);
	const { data, isLoading, isError } = useArticles(query);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header onTogglePreferences={() => setPreferencesOpen((o) => !o)} />
			<PreferencesPanel
				open={preferencesOpen}
				onClose={() => setPreferencesOpen(false)}
			/>

			<main className="max-w-6xl mx-auto px-4 py-6">
				<div className="mb-6">
					<SearchBar
						value={filters.keyword}
						onChange={(v) => updateFilter('keyword', v)}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
					<FilterPanel
						filters={filters}
						updateFilter={updateFilter}
						onReset={resetFilters}
					/>

					<ArticleList
						articles={data?.articles ?? []}
						isLoading={isLoading}
						isError={isError}
						failedSources={data?.failedSources}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
