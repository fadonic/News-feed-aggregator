import axios from 'axios';
import type { NewsSourceAdapter } from './NewsSourceAdapter';
import type { Article } from '../../types/article';
import type { ArticleQuery, ArticleQueryResult } from '../../types/query';
import { env } from '../../config/env';

// interface NyTimesMultimedia {
// 	url: string;
// 	format: string;
// }

// interface NyTimesRawDoc {
// 	_id: string;
// 	headline: { main: string };
// 	abstract: string | null;
// 	lead_paragraph: string | null;
// 	web_url: string;
// 	multimedia: NyTimesMultimedia[] | null;
// 	pub_date: string;
// 	section_name: string | null;
// 	byline: { original: string | null } | null;
// }

interface NyTimesMultimediaImage {
	url: string;
	height: number;
	width: number;
}

interface NyTimesMultimedia {
	caption: string;
	credit: string;
	default: NyTimesMultimediaImage;
	thumbnail: NyTimesMultimediaImage;
}

interface NyTimesRawDoc {
	_id: string;
	headline: { main: string };
	abstract: string | null;
	lead_paragraph: string | null;
	web_url: string;
	multimedia: NyTimesMultimedia | null;
	pub_date: string;
	section_name: string | null;
	byline: { original: string | null } | null;
}

interface NyTimesResponse {
	response: {
		docs: NyTimesRawDoc[];
		metadata: { hits: number; offset: number; time: number };
	};
}

// NYT's fq filter matches section_name exactly and is case-sensitive.
// Most of our categories line up with real NYT sections, but
// "Entertainment" doesn't exist there — NYT calls it "Arts".
const CATEGORY_MAP: Record<string, string> = {
	World: 'World',
	Business: 'Business',
	Technology: 'Technology',
	Science: 'Science',
	Sports: 'Sports',
	Entertainment: 'Arts',
	Health: 'Health',
	Politics: 'Politics',
};

function mapCategory(category?: string): string | undefined {
	if (!category) return undefined;
	return CATEGORY_MAP[category] ?? category;
}

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

// function extractImage(multimedia: NyTimesMultimedia[] | null): string | null {
// 	if (!multimedia || multimedia.length === 0) return null;
// 	const img =
// 		multimedia.find((m) => m.format === 'Standard Thumbnail') ?? multimedia[0];
// 	// NYT multimedia URLs are relative and need the host prefixed.
// 	return img.url.startsWith('http')
// 		? img.url
// 		: `https://www.nytimes.com/${img.url}`;
// }
function extractImage(multimedia: NyTimesMultimedia | null): string | null {
	if (!multimedia?.default?.url) return null;
	// NYT's `default` and `thumbnail` URLs are already absolute in the
	// current API response — no host prefixing needed.
	return multimedia.default.url;
}

function mapArticle(raw: NyTimesRawDoc): Article {
	console.log('raw data::', raw);
	return {
		id: raw._id,
		title: raw.headline.main,
		description: raw.abstract,
		content: raw.lead_paragraph,
		url: raw.web_url,
		imageUrl: extractImage(raw.multimedia),
		publishedAt: raw.pub_date,
		source: 'nytimes',
		sourceName: 'The New York Times',
		author: raw.byline?.original ?? null,
		category: raw.section_name,
	};
}

export class NyTimesAdapter implements NewsSourceAdapter {
	readonly id = 'nytimes' as const;

	async fetchArticles(query: ArticleQuery): Promise<ArticleQueryResult> {
		const filterQueries: string[] = [];
		//if (query.category)filterQueries.push(`section_name:("${query.category}")`);

		const mappedCategory = mapCategory(query.category);
		if (mappedCategory)
			filterQueries.push(`section_name:("${mappedCategory}")`);

		const { data } = await axios.get<NyTimesResponse>(BASE_URL, {
			params: {
				q: query.keyword || undefined,
				begin_date: query.fromDate?.replace(/-/g, '') || undefined,
				end_date: query.toDate?.replace(/-/g, '') || undefined,
				fq: filterQueries.length ? filterQueries.join(' AND ') : undefined,
				page: (query.page ?? 1) - 1, // NYT pages are 0-indexed
				'api-key': env.nytApiKey,
			},
		});

		return {
			articles: data.response.docs.map(mapArticle),
			totalResults: data.response.metadata.hits,
			source: this.id,
		};
	}
}
