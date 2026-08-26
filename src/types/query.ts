import type { NewsSourceId } from './article';

export interface ArticleQuery {
	keyword?: string;
	category?: string;
	fromDate?: string;
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
