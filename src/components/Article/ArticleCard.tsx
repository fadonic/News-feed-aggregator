import type { Article } from '../../types/article';
import { formatRelativeDate } from '../../utils/date';

interface ArticleCardProps {
	article: Article;
}

const FALLBACK_IMAGE =
	'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="400" height="200" fill="%23e5e7eb"/></svg>';

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<a
			href={article.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow"
		>
			<img
				src={article.imageUrl ?? FALLBACK_IMAGE}
				alt=""
				loading="lazy"
				className="h-40 w-full object-cover bg-gray-100"
				onError={(e) => {
					(e.target as HTMLImageElement).src = FALLBACK_IMAGE;
				}}
			/>

			<div className="flex flex-col flex-1 p-4">
				<div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
					<span className="font-medium text-blue-600">
						{article.sourceName}
					</span>

					{article.category && <span>· {article.category}</span>}

					<span>· {formatRelativeDate(article.publishedAt)}</span>
				</div>

				<h3 className="font-semibold text-gray-900 leading-snug group-hover:text-blue-700 line-clamp-3">
					{article.title}
				</h3>

				{article.description && (
					<p className="mt-1.5 text-sm text-gray-600 line-clamp-2">
						{article.description}
					</p>
				)}

				{article.author && (
					<p className="mt-auto pt-2 text-xs text-gray-400">
						By {article.author}
					</p>
				)}
			</div>
		</a>
	);
}
