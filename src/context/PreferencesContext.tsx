import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	type ReactNode,
} from 'react';
import type { UserPreferences } from '../types/preferences';
import { DEFAULT_PREFERENCES } from '../types/preferences';
import {
	preferencesReducer,
	type PreferencesAction,
} from './preferencesReducer';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'news-aggregator:preferences';

interface PreferencesContextValue {
	preferences: UserPreferences;
	dispatch: React.Dispatch<PreferencesAction>;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
	undefined,
);

export function PreferencesProvider({ children }: { children: ReactNode }) {
	const [preferences, dispatch] = useReducer(
		preferencesReducer,
		DEFAULT_PREFERENCES,
		(initial) => loadFromStorage(STORAGE_KEY, initial),
	);

	useEffect(() => {
		saveToStorage(STORAGE_KEY, preferences);
	}, [preferences]);

	return (
		<PreferencesContext.Provider value={{ preferences, dispatch }}>
			{children}
		</PreferencesContext.Provider>
	);
}

export function usePreferences(): PreferencesContextValue {
	const ctx = useContext(PreferencesContext);
	if (!ctx) {
		throw new Error('usePreferences must be used within a PreferencesProvider');
	}
	return ctx;
}
