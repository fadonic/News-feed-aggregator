import { useState, useMemo, useEffect } from 'react';
import type { ArticleQuery } from '../types/query';
import type { NewsSourceId } from '../types/article';

export interface ArticleFilters {
	keyword: string;
	category: string;
	fromDate: string;
	toDate: string;
	sources: NewsSourceId[];
}

const EMPTY_FILTERS: ArticleFilters = {
	keyword: '',
	category: '',
	fromDate: '',
	toDate: '',
	sources: [],
};

const KEYWORD_DEBOUNCE_MS = 400;

export function useArticleFilters() {
	const [filters, setFilters] = useState<ArticleFilters>(EMPTY_FILTERS);
	const [debouncedKeyword, setDebouncedKeyword] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedKeyword(filters.keyword);
		}, KEYWORD_DEBOUNCE_MS);

		return () => clearTimeout(timeout);
	}, [filters.keyword]);

	const query = useMemo<ArticleQuery>(
		() => ({
			keyword: debouncedKeyword.trim() || undefined,
			categories: filters.category ? [filters.category] : undefined,
			fromDate: filters.fromDate || undefined,
			toDate: filters.toDate || undefined,
			sources: filters.sources.length ? filters.sources : undefined,
		}),
		[
			debouncedKeyword,
			filters.category,
			filters.fromDate,
			filters.toDate,
			filters.sources,
		],
	);

	function updateFilter<K extends keyof ArticleFilters>(
		key: K,
		value: ArticleFilters[K],
	) {
		setFilters((prev) => ({ ...prev, [key]: value }));
	}

	function resetFilters() {
		setFilters(EMPTY_FILTERS);
		setDebouncedKeyword('');
	}

	return { filters, query, debouncedKeyword, updateFilter, resetFilters };
}
