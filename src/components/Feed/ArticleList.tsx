import type { Article } from '../../types/article';
import { ArticleCard } from '../Article/ArticleCard';
import { ArticleCardSkeleton } from '../Common/ArticleCardSkeleton';

interface ArticleListProps {
	articles: Article[];
	isLoading: boolean;
	isError: boolean;
	failedSources?: string[];
}

export function ArticleList({
	articles,
	isLoading,
	isError,
	failedSources,
}: ArticleListProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<ArticleCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-16 text-gray-500">
				Something went wrong loading articles. Please try again.
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className="text-center py-16 text-gray-500">
				No articles found. Try adjusting your search or filters.
			</div>
		);
	}

	return (
		<div>
			{failedSources && failedSources.length > 0 && (
				<p className="mb-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
					Couldn't load results from: {failedSources.join(', ')}. Showing
					available results.
				</p>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{articles.map((article) => (
					<ArticleCard
						key={`${article.source}-${article.id}`}
						article={article}
					/>
				))}
			</div>
		</div>
	);
}
