/**
 * Normalized category list for filter UI. Each adapter maps this onto its
 * own provider's taxonomy (e.g. NYT's fq section_name, Guardian's section).
 * Keeping one canonical list here avoids each component inventing its own.
 */
export const CATEGORIES = [
	'World',
	'Business',
	'Technology',
	'Science',
	'Sports',
	'Entertainment',
	'Health',
	'Politics',
] as const;

export type Category = (typeof CATEGORIES)[number];
