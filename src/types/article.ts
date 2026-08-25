export interface Article {
	id: string;
	title: string;
	description: string | null;
	content: string | null;
	url: string;
	imageUrl: string | null;
	publishedAt: string;
	source: NewsSourceId;
	sourceName: string;
	author: string | null;
	category: string | null;
}

export type NewsSourceId = 'newsapi' | 'guardian' | 'nytimes';

export interface NewsSourceMeta {
	id: NewsSourceId;
	label: string;
}

export const NEWS_SOURCES: NewsSourceMeta[] = [
	{ id: 'newsapi', label: 'NewsAPI' },
	{ id: 'guardian', label: 'The Guardian' },
	{ id: 'nytimes', label: 'The New York Times' },
];
