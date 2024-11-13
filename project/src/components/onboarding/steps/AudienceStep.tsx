import React from 'react';

interface AudienceStepProps {
  targetAudience: string;
  onChange: (audience: string) => void;
}

const AudienceStep: React.FC<AudienceStepProps> = ({ targetAudience, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Describe your target audience
        </h2>
        <p className="mt-2 text-gray-600">
          Help us understand who your newsletter is for. This will help generate more relevant content for your readers.
        </p>
      </div>

      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
          Target Audience Description
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Be specific about your audience's interests, knowledge level, and what they're looking to gain from your newsletter.
        </p>
        <textarea
          id="audience"
          value={targetAudience}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          placeholder="e.g., Tech-savvy professionals aged 25-45 who want to stay updated on emerging technologies and their practical applications. They have a basic understanding of technology but appreciate clear explanations without technical jargon."
          className="mt-3 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for a great audience description:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include demographic information (age, profession, etc.)</li>
          <li>• Mention their knowledge level in your topic area</li>
          <li>• Describe their goals and what they want to learn</li>
          <li>• Note any specific interests or pain points</li>
        </ul>
      </div>
    </div>
  );
};

export default AudienceStep;