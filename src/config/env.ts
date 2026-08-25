/**
 * Single place that reads Vite env vars. Keeping this centralized means
 * if we ever change how config is sourced (e.g. a runtime-injected config
 * for Docker), only this file changes.
 */
export const env = {
	newsApiKey: import.meta.env.VITE_NEWSAPI_KEY ?? '',
	guardianApiKey: import.meta.env.VITE_GUARDIAN_KEY ?? '',
	nytApiKey: import.meta.env.VITE_NYTIMES_KEY ?? '',
};
