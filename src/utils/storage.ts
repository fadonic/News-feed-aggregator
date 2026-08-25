/**
 * Thin, typed wrapper around localStorage. Centralizing this means every
 * place that needs persistence (preferences today, maybe saved searches
 * later) doesn't repeat try/catch and JSON parsing logic.
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

export function saveToStorage<T>(key: string, value: T): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		console.log('saving to storage has failed!');
	}
}
