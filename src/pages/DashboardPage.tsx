import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { 
  Newspaper, 
  Search,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import NewsletterList from '../components/dashboard/NewsletterList';
import ContentFeed from '../components/dashboard/ContentFeed';
import NewsletterBuilder from '../components/dashboard/NewsletterBuilder';
import NewsFilters from '../components/dashboard/NewsFilters';
import type { NewsFilters as NewsFiltersType } from '../types/news';
import type { Newsletter, NewsletterArticle } from '../types/newsletter';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { updateNewsletterContent } from '../services/newsletters';

const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedNewsletter, setSelectedNewsletter] = React.useState<Newsletter | null>(null);
  const [filters, setFilters] = React.useState<NewsFiltersType>({
    country: 'us',
    language: 'en',
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!selectedNewsletter) return;

    const { active, over } = event;
    if (!over) return;

    const article = active.data.current as NewsletterArticle;
    const dropZone = over.id as 'featured_story' | 'news';

    try {
      const newContent = { ...selectedNewsletter.content };

      if (dropZone === 'featured_story') {
        newContent.featured_story = article;
      } else if (dropZone === 'news') {
        if (newContent.news.length >= 10) {
          toast.error('Maximum of 10 articles reached');
          return;
        }
        if (!newContent.news.find(a => a.article_id === article.article_id)) {
          newContent.news.push(article);
        }
      }

      const updatedNewsletter = await updateNewsletterContent(selectedNewsletter.id, newContent);
      setSelectedNewsletter(updatedNewsletter);
      toast.success('Article added to newsletter');
    } catch (error) {
      console.error('Error updating newsletter:', error);
      toast.error('Failed to add article');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, q: searchQuery }));
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Left Sidebar - Newsletter List */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <NewsletterList
          selectedNewsletter={selectedNewsletter}
          onSelectNewsletter={setSelectedNewsletter}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Content Feed */}
          <div className="flex-1 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Content Room</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setFilters({ ...filters })}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Refresh content"
                  >
                    <RefreshCw className="h-5 w-5 text-gray-600" />
                  </button>
                  <NewsFilters
                    filters={filters}
                    onFilterChange={setFilters}
                  />
                </div>
              </div>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search content..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
            <ContentFeed filters={filters} />
          </div>

          {/* Newsletter Builder */}
          <div className="w-96 bg-white sticky top-0 h-screen overflow-y-auto">
            {selectedNewsletter ? (
              <>
                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Template</h2>
                </div>
                <NewsletterBuilder
                  newsletter={selectedNewsletter}
                  onUpdate={setSelectedNewsletter}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Newspaper className="h-12 w-12 mb-4" />
                <p>Select or create a newsletter to start editing</p>
              </div>
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default DashboardPage;