import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchNews } from '../../services/news';
import type { NewsArticle, NewsFilters } from '../../types/news';

interface ContentFeedProps {
  filters: NewsFilters;
}

const DraggableArticle: React.FC<{ article: NewsArticle }> = ({ article }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: article.article_id,
    data: article,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      {...attributes}
      {...listeners}
    >
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
      </div>
      <div className="flex items-start space-x-3">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {article.source_name}
            </span>
            {article.creator && article.creator.length > 0 && (
              <span className="text-xs text-gray-500">
                by {article.creator.join(', ')}
              </span>
            )}
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            {article.title}
          </h3>
          {article.description && (
            <p className="text-sm text-gray-600">{article.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>{new Date(article.pubDate).toLocaleString()}</span>
            {article.category && article.category.map((cat) => (
              <span key={cat} className="px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                {cat}
              </span>
            ))}
            {article.country && article.country.map((country) => (
              <span key={country} className="px-2 py-0.5 rounded bg-green-50 text-green-600">
                {country.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentFeed: React.FC<ContentFeedProps> = ({ filters }) => {
  const [articles, setArticles] = React.useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadNews = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNews(filters);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  React.useEffect(() => {
    loadNews();
  }, [filters, loadNews]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
        <button
          onClick={loadNews}
          className="ml-auto p-2 hover:bg-red-100 rounded-full"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No articles found for the selected filters.
            </div>
          ) : (
            articles.map((article) => (
              <DraggableArticle key={article.article_id} article={article} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContentFeed;