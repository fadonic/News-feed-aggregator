import type { UserPreferences } from '../types/preferences';
import type { NewsSourceId } from '../types/article';

export type PreferencesAction =
	| { type: 'TOGGLE_SOURCE'; payload: NewsSourceId }
	| { type: 'TOGGLE_CATEGORY'; payload: string }
	| { type: 'TOGGLE_AUTHOR'; payload: string }
	| { type: 'RESET' };

function toggle<T>(list: T[], value: T): T[] {
	return list.includes(value)
		? list.filter((v) => v !== value)
		: [...list, value];
}

export function preferencesReducer(
	state: UserPreferences,
	action: PreferencesAction,
): UserPreferences {
	switch (action.type) {
		case 'TOGGLE_SOURCE':
			return { ...state, sources: toggle(state.sources, action.payload) };
		case 'TOGGLE_CATEGORY':
			return { ...state, categories: toggle(state.categories, action.payload) };
		case 'TOGGLE_AUTHOR':
			return { ...state, authors: toggle(state.authors, action.payload) };
		case 'RESET':
			return { sources: [], categories: [], authors: [] };
		default:
			return state;
	}
}
