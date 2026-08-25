import { useMemo } from 'react';
import type { ArticleQuery } from '../types/query';
import type { ArticleFilters } from './useArticleFilters';
import type { UserPreferences } from '../types/preferences';

export function usePersonalizedQuery(
	filters: ArticleFilters,
	debouncedKeyword: string,
	preferences: UserPreferences,
): ArticleQuery {
	return useMemo<ArticleQuery>(() => {
		const sources = filters.sources.length
			? filters.sources
			: preferences.sources;
		const category = filters.category || preferences.categories[0] || '';

		return {
			keyword: debouncedKeyword.trim() || undefined,
			category: category || undefined,
			fromDate: filters.fromDate || undefined,
			toDate: filters.toDate || undefined,
			sources: sources.length ? sources : undefined,
			authors: preferences.authors.length ? preferences.authors : undefined,
		};
	}, [filters, debouncedKeyword, preferences]);
}
