import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Sparkles } from 'lucide-react';
import { generateNewsletterContent } from '../../services/claude';
import type { Newsletter, NewsletterArticle } from '../../types/newsletter';
import NewsletterEditor from './NewsletterEditor';
import toast from 'react-hot-toast';
import { updateNewsletterContent } from '../../services/newsletters';

interface NewsletterBuilderProps {
  newsletter: Newsletter;
  onUpdate: (newsletter: Newsletter) => void;
}

const DroppableSection: React.FC<{
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ id, title, description, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'
      }`}
    >
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {children}
    </div>
  );
};

const ArticlePreview: React.FC<{ article: NewsletterArticle }> = ({ article }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
        {article.source_name}
      </span>
      <span className="text-xs text-gray-500">
        {new Date(article.pubDate).toLocaleDateString()}
      </span>
    </div>
    <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
    {article.description && (
      <p className="text-sm text-gray-600">{article.description}</p>
    )}
  </div>
);

const NewsletterBuilder: React.FC<NewsletterBuilderProps> = ({ newsletter, onUpdate }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);

  const handleGenerateContent = async () => {
    if (!newsletter.content.featured_story && newsletter.content.news.length === 0) {
      toast.error('Add some articles before generating content');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Generating newsletter content...');

    try {
      const articles = [
        newsletter.content.featured_story,
        ...newsletter.content.news,
      ].filter((article): article is NewsletterArticle => article !== null);

      if (articles.length === 0) {
        throw new Error('No articles selected');
      }

      const generatedContent = await generateNewsletterContent(articles);
      
      const updatedNewsletter = await updateNewsletterContent(newsletter.id, {
        ...newsletter.content,
        ...generatedContent,
      });
      
      onUpdate(updatedNewsletter);
      setShowEditor(true);
      toast.success('Newsletter content generated successfully!', { id: toastId });
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate newsletter content',
        { id: toastId }
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {showEditor ? (
        <NewsletterEditor
          newsletter={newsletter}
          onUpdate={(content) => {
            onUpdate({
              ...newsletter,
              content: {
                ...newsletter.content,
                htmlContent: content,
              },
            });
          }}
          isGenerating={isGenerating}
        />
      ) : (
        <>
          <DroppableSection
            id="featured_story"
            title="Featured Story"
            description="Drop your main article here"
          >
            {newsletter.content.featured_story ? (
              <ArticlePreview article={newsletter.content.featured_story} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Drop an article here
              </div>
            )}
          </DroppableSection>

          <DroppableSection
            id="news"
            title="News You Can't Miss"
            description="Drop up to 10 supporting articles"
          >
            <div className="space-y-4">
              {newsletter.content.news.length > 0 ? (
                newsletter.content.news.map((article) => (
                  <ArticlePreview key={article.article_id} article={article} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Drop articles here
                </div>
              )}
            </div>
          </DroppableSection>

          <button
            onClick={handleGenerateContent}
            disabled={isGenerating}
            className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Newsletter'}
          </button>
        </>
      )}
    </div>
  );
};

export default NewsletterBuilder;