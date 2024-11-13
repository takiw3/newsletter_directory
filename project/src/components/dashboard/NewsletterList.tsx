import React from 'react';
import { Newspaper, MoreVertical, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createNewsletter, deleteNewsletter, fetchNewsletters } from '../../services/newsletters';
import type { Newsletter } from '../../types/newsletter';
import toast from 'react-hot-toast';

interface NewsletterListProps {
  selectedNewsletter?: Newsletter;
  onSelectNewsletter: (newsletter: Newsletter) => void;
}

const NewsletterList: React.FC<NewsletterListProps> = ({ selectedNewsletter, onSelectNewsletter }) => {
  const { user } = useAuth();
  const [newsletters, setNewsletters] = React.useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState('');

  const loadNewsletters = React.useCallback(async () => {
    if (!user) return;
    try {
      const data = await fetchNewsletters(user.id);
      setNewsletters(data);
    } catch (error) {
      console.error('Error loading newsletters:', error);
      toast.error('Failed to load newsletters');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    loadNewsletters();
  }, [loadNewsletters]);

  const handleCreateNewsletter = async () => {
    if (!user) return;
    try {
      const name = 'Untitled Newsletter';
      const newsletter = await createNewsletter(user.id, name);
      setNewsletters([newsletter, ...newsletters]);
      onSelectNewsletter(newsletter);
      setEditingId(newsletter.id);
      setEditName(name);
      toast.success('Newsletter created');
    } catch (error) {
      console.error('Error creating newsletter:', error);
      toast.error('Failed to create newsletter');
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    try {
      await deleteNewsletter(id);
      setNewsletters(newsletters.filter(n => n.id !== id));
      if (selectedNewsletter?.id === id) {
        onSelectNewsletter(newsletters[0]);
      }
      toast.success('Newsletter deleted');
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      toast.error('Failed to delete newsletter');
    }
  };

  const handleUpdateName = async (id: string) => {
    try {
      const newsletter = newsletters.find(n => n.id === id);
      if (!newsletter || newsletter.name === editName) {
        setEditingId(null);
        return;
      }

      const updated = { ...newsletter, name: editName };
      await updateNewsletter(id, { name: editName });
      setNewsletters(newsletters.map(n => n.id === id ? updated : n));
      setEditingId(null);
      toast.success('Newsletter name updated');
    } catch (error) {
      console.error('Error updating newsletter:', error);
      toast.error('Failed to update newsletter name');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={handleCreateNewsletter}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Newsletter
        </button>
      </div>

      <div className="space-y-1 p-2">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className={`group relative p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
              selectedNewsletter?.id === newsletter.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectNewsletter(newsletter)}
          >
            <div className="flex items-center space-x-3">
              <Newspaper className="h-5 w-5 text-gray-400" />
              <div className="flex-1 min-w-0">
                {editingId === newsletter.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => handleUpdateName(newsletter.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateName(newsletter.id)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {newsletter.name}
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {newsletter.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Updated {new Date(newsletter.updated_at).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(newsletter.id);
                  setEditName(newsletter.name);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNewsletter(newsletter.id);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}

        {newsletters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No newsletters yet
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterList;