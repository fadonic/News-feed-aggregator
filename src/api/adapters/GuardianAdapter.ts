import axios from 'axios';
import type { NewsSourceAdapter } from './NewsSourceAdapter';
import type { Article } from '../../types/article';
import type { ArticleQuery, ArticleQueryResult } from '../../types/query';
import { env } from '../../config/env';

interface GuardianRawResult {
	id: string;
	webTitle: string;
	webUrl: string;
	sectionName: string;
	webPublicationDate: string;
	fields?: {
		trailText?: string;
		thumbnail?: string;
		bodyText?: string;
		byline?: string;
	};
}

interface GuardianResponse {
	response: {
		total: number;
		results: GuardianRawResult[];
	};
}

const CATEGORY_MAP: Record<string, string> = {
	World: 'world',
	Business: 'business',
	Technology: 'technology',
	Science: 'science',
	Sports: 'sport',
	Entertainment: 'culture',
	Health: 'society',
	Politics: 'politics',
};

function mapCategory(category?: string): string | undefined {
	if (!category) return undefined;
	return CATEGORY_MAP[category] ?? category.toLowerCase();
}

const BASE_URL = 'https://content.guardianapis.com/search';

function mapArticle(raw: GuardianRawResult): Article {
	return {
		id: raw.id,
		title: raw.webTitle,
		description: raw.fields?.trailText ?? null,
		content: raw.fields?.bodyText ?? null,
		url: raw.webUrl,
		imageUrl: raw.fields?.thumbnail ?? null,
		publishedAt: raw.webPublicationDate,
		source: 'guardian',
		sourceName: 'The Guardian',
		author: raw.fields?.byline ?? null,
		category: raw.sectionName,
	};
}

export class GuardianAdapter implements NewsSourceAdapter {
	readonly id = 'guardian' as const;

	async fetchArticles(query: ArticleQuery): Promise<ArticleQueryResult> {
		const { data } = await axios.get<GuardianResponse>(BASE_URL, {
			params: {
				q: query.keyword || undefined,
				section: mapCategory(query.category),
				'from-date': query.fromDate || undefined,
				'to-date': query.toDate || undefined,
				page: query.page ?? 1,
				'page-size': query.pageSize ?? 20,
				'show-fields': 'trailText,thumbnail,bodyText,byline',
				'api-key': env.guardianApiKey,
			},
		});

		return {
			articles: data.response.results.map(mapArticle),
			totalResults: data.response.total,
			source: this.id,
		};
	}
}
