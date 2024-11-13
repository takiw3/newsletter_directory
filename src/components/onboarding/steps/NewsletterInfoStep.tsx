import React from 'react';

interface NewsletterInfoStepProps {
  name: string;
  pitch: string;
  onNameChange: (name: string) => void;
  onPitchChange: (pitch: string) => void;
}

const NewsletterInfoStep: React.FC<NewsletterInfoStepProps> = ({
  name,
  pitch,
  onNameChange,
  onPitchChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Tell us about your newsletter
        </h2>
        <p className="mt-2 text-gray-600">
          This information helps us understand your newsletter's purpose and generate more relevant content.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Newsletter Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Tech Weekly Digest"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
            Newsletter Pitch
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Describe your newsletter's purpose and what readers can expect in a few sentences.
          </p>
          <textarea
            id="pitch"
            value={pitch}
            onChange={(e) => onPitchChange(e.target.value)}
            rows={4}
            placeholder="e.g., A weekly curated digest of the latest technology trends, breaking news, and expert insights. We focus on making complex tech topics accessible to everyone, from beginners to experts."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterInfoStep;