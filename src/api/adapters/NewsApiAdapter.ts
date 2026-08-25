import axios from 'axios';
import type { NewsSourceAdapter } from './NewsSourceAdapter';
import type { Article } from '../../types/article';
import type { ArticleQuery, ArticleQueryResult } from '../../types/query';
import { env } from '../../config/env';

interface NewsApiRawArticle {
	source: { id: string | null; name: string };
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
}

interface NewsApiResponse {
	status: string;
	totalResults: number;
	articles: NewsApiRawArticle[];
}

const BASE_URL = 'https://newsapi.org/v2/everything';

function mapArticle(raw: NewsApiRawArticle): Article {
	return {
		id: raw.url,
		title: raw.title,
		description: raw.description,
		content: raw.content,
		url: raw.url,
		imageUrl: raw.urlToImage,
		publishedAt: raw.publishedAt,
		source: 'newsapi',
		sourceName: raw.source.name,
		author: raw.author,
		category: null, // NewsAPI's /everything endpoint doesn't return category
	};
}

export class NewsApiAdapter implements NewsSourceAdapter {
	readonly id = 'newsapi' as const;

	async fetchArticles(query: ArticleQuery): Promise<ArticleQueryResult> {
		const searchTerms = [query.keyword, query.category]
			.filter(Boolean)
			.join(' ');
		const keyword = searchTerms || 'news';

		const { data } = await axios.get<NewsApiResponse>(BASE_URL, {
			params: {
				q: keyword || undefined,
				from: query.fromDate || undefined,
				to: query.toDate || undefined,
				page: query.page ?? 1,
				pageSize: query.pageSize ?? 20,
				sortBy: 'publishedAt',
				apiKey: env.newsApiKey,
			},
		});

		return {
			articles: data.articles.map(mapArticle),
			totalResults: data.totalResults,
			source: this.id,
		};
	}
}
