import type { NewsSourceId } from './article';

export interface UserPreferences {
	sources: NewsSourceId[];
	categories: string[];
	authors: string[];
}

export const DEFAULT_PREFERENCES: UserPreferences = {
	sources: [],
	categories: [],
	authors: [],
};
