import type { NewsSourceId } from './article';

/**
 * Unified query shape passed to every adapter. Each adapter maps these
 * generic fields onto its provider-specific query params.
 */
export interface ArticleQuery {
	keyword?: string;
	category?: string;
	fromDate?: string; // ISO date (yyyy-MM-dd) same with toDate
	toDate?: string;
	sources?: NewsSourceId[];
	authors?: string[];
	page?: number;
	pageSize?: number;
}

export interface ArticleQueryResult {
	articles: import('./article').Article[];
	totalResults: number;
	source: NewsSourceId;
}
