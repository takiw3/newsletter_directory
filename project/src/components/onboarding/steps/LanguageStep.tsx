import React from 'react';
import { Check, Search } from 'lucide-react';

interface LanguageStepProps {
  language: string;
  onChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese (Simplified)' },
];

const LanguageStep: React.FC<LanguageStepProps> = ({ language, onChange }) => {
  const [search, setSearch] = React.useState('');

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Choose your newsletter's language
        </h2>
        <p className="mt-2 text-gray-600">
          Select the primary language for your newsletter content.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search languages..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`flex items-center p-3 border rounded-lg transition-all ${
              language === lang.code
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
            }`}
          >
            <span className="flex-1 text-left">{lang.name}</span>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                language === lang.code
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              {language === lang.code && <Check className="h-3 w-3" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageStep;