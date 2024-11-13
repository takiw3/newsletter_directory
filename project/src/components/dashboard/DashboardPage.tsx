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

const DashboardPage = () => {
  // ... existing state and handlers ...

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
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              {/* ... existing search and filters ... */}
            </div>
            <ContentFeed filters={filters} />
          </div>

          {/* Newsletter Builder */}
          <div className="w-96 bg-white sticky top-0 h-screen overflow-y-auto">
            {selectedNewsletter ? (
              <>
                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Template</h2>
                    <button 
                      onClick={() => handleGenerateNewsletter(selectedNewsletter)}
                      className="text-purple-600 hover:text-purple-700 px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <span className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate
                      </span>
                    </button>
                  </div>
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