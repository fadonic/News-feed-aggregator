import type { Article } from '../types/article';
import type { ArticleQuery } from '../types/query';
import { adapterRegistry, getAllAdapters } from './adapters/registry';

export interface AggregatedResult {
	articles: Article[];
	totalResults: number;
	failedSources: string[];
}

/**
 * The single entry point the rest of the app uses to fetch articles.
 * Hides the fact that results come from multiple independent providers.
 *
 * If query.sources is provided, only those adapters are queried; otherwise
 * all registered adapters are queried. A failure in one source never blocks
 * the others (Promise.allSettled), which keeps the UI resilient.
 */
export class NewsAggregatorService {
	async fetchArticles(query: ArticleQuery): Promise<AggregatedResult> {
		const adapters = query.sources?.length
			? query.sources.map((id) => adapterRegistry[id])
			: getAllAdapters();

		const settled = await Promise.allSettled(
			adapters.map((adapter) => adapter.fetchArticles(query)),
		);

		const articles: Article[] = [];
		let totalResults = 0;
		const failedSources: string[] = [];

		settled.forEach((result, i) => {
			if (result.status === 'fulfilled') {
				articles.push(...result.value.articles);
				totalResults += result.value.totalResults;
			} else {
				failedSources.push(adapters[i].id);
				console.error(`[${adapters[i].id}] fetch failed:`, result.reason);
			}
		});

		const filtered = filterByAuthors(articles, query.authors);
		const sorted = filtered.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);

		return { articles: sorted, totalResults, failedSources };
	}
}

function filterByAuthors(articles: Article[], authors?: string[]): Article[] {
	if (!authors || authors.length === 0) return articles;
	const wanted = new Set(authors.map((a) => a.toLowerCase()));
	return articles.filter((a) => a.author && wanted.has(a.author.toLowerCase()));
}

export const newsAggregatorService = new NewsAggregatorService();
