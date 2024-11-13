import React from 'react';
import { X } from 'lucide-react';

interface TopicsStepProps {
  topics: string[];
  onChange: (topics: string[]) => void;
}

const SUGGESTED_TOPICS = [
  'Technology', 'Business', 'Finance', 'Marketing', 'Health & Wellness',
  'Science', 'Education', 'Entertainment', 'Sports', 'Politics',
  'Environment', 'Food & Cooking', 'Travel', 'Fashion', 'Art & Design',
  'Personal Development', 'Career Advice', 'Parenting', 'Gaming', 'Music'
];

const TopicsStep: React.FC<TopicsStepProps> = ({ topics, onChange }) => {
  const [customTopic, setCustomTopic] = React.useState('');

  const handleAddTopic = (topic: string) => {
    if (!topics.includes(topic)) {
      onChange([...topics, topic]);
    }
  };

  const handleRemoveTopic = (topic: string) => {
    onChange(topics.filter((t) => t !== topic));
  };

  const handleAddCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim() && !topics.includes(customTopic.trim())) {
      handleAddTopic(customTopic.trim());
      setCustomTopic('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          What topics does your newsletter cover?
        </h2>
        <p className="mt-2 text-gray-600">
          Select all topics that apply or add your own custom topics.
        </p>
      </div>

      {/* Selected Topics */}
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {topic}
            <button
              onClick={() => handleRemoveTopic(topic)}
              className="ml-2 inline-flex items-center"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>

      {/* Custom Topic Input */}
      <form onSubmit={handleAddCustomTopic} className="flex gap-2">
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="Add a custom topic"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </form>

      {/* Suggested Topics */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Suggested Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TOPICS.filter((topic) => !topics.includes(topic)).map((topic) => (
            <button
              key={topic}
              onClick={() => handleAddTopic(topic)}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsStep;