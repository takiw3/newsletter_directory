import React from 'react';
import { Filter } from 'lucide-react';
import { NEWS_CATEGORIES, COUNTRIES, type NewsFilters } from '../../types/news';

interface NewsFiltersProps {
  filters: NewsFilters;
  onFilterChange: (filters: NewsFilters) => void;
}

const NewsFilters: React.FC<NewsFiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFilterChange = (key: keyof NewsFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
    // Don't automatically close the filter menu to allow multiple selections
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg flex items-center gap-2 ${
          Object.keys(filters).length > 2 
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Filter className="h-5 w-5" />
        <span className="text-sm">
          {Object.keys(filters).length > 2 ? 'Filters Active' : 'Filters'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={filters.country || 'us'}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
              >
                <option value="">All Categories</option>
                {NEWS_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={filters.language || 'en'}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  onFilterChange({ country: 'us', language: 'en' });
                  setIsOpen(false);
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFilters;