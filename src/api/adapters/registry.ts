import type { NewsSourceAdapter } from './NewsSourceAdapter';
import type { NewsSourceId } from '../../types/article';
import { NewsApiAdapter } from './NewsApiAdapter';
import { GuardianAdapter } from './GuardianAdapter';
import { NyTimesAdapter } from './NyTimesAdapter';

/**
 * Central registry of available adapters. To add a new source: write the
 * adapter class, add one line here. Nothing else in the app needs to know.
 */
export const adapterRegistry: Record<NewsSourceId, NewsSourceAdapter> = {
	newsapi: new NewsApiAdapter(),
	guardian: new GuardianAdapter(),
	nytimes: new NyTimesAdapter(),
};

export function getAllAdapters(): NewsSourceAdapter[] {
	return Object.values(adapterRegistry);
}
