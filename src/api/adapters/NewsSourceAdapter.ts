import type { ArticleQuery, ArticleQueryResult } from '../../types/query';
import type { NewsSourceId } from '../../types/article';

/**
 * Common contract every news source integration must fulfil.
 *
 * The rest of the app (hooks, components) depends only on this interface,
 * never on a concrete provider. Adding a 4th data source means writing one
 * new class that implements this interface and registering it — no
 * existing code needs to change (Open/Closed Principle).
 */
export interface NewsSourceAdapter {
	readonly id: NewsSourceId;
	fetchArticles(query: ArticleQuery): Promise<ArticleQueryResult>;
}
