import { useQuery } from '@tanstack/react-query';
import type { ArticleQuery } from '../types/query';
import { newsAggregatorService } from '../api/NewsAggregatorService';

/**
 * The one hook components use to get articles. Encapsulates caching,
 * loading, and error state via TanStack Query — components never touch
 * the aggregator service directly.
 */
export function useArticles(query: ArticleQuery) {
	return useQuery({
		queryKey: ['articles', query],
		queryFn: () => newsAggregatorService.fetchArticles(query),
		placeholderData: (previousData) => previousData,
	});
}
