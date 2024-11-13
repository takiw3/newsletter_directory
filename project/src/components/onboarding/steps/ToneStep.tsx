import React from 'react';
import { Check } from 'lucide-react';

interface ToneStepProps {
  tone: string;
  onChange: (tone: string) => void;
}

const tones = [
  {
    name: 'Authoritative',
    description: 'Expert, commanding, and confident tone that establishes credibility',
  },
  {
    name: 'Conversational',
    description: 'Friendly, approachable, and engaging like talking to a friend',
  },
  {
    name: 'Concise',
    description: 'Clear, brief, and straight to the point without extra fluff',
  },
  {
    name: 'Professional',
    description: 'Formal, business-like tone suitable for corporate communications',
  },
  {
    name: 'Inspirational',
    description: 'Motivating, uplifting, and encouraging tone that inspires action',
  },
];

const ToneStep: React.FC<ToneStepProps> = ({ tone, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Select your newsletter's tone
        </h2>
        <p className="mt-2 text-gray-600">
          Choose the writing style that best matches your brand voice.
        </p>
      </div>

      <div className="space-y-3">
        {tones.map((t) => (
          <button
            key={t.name}
            onClick={() => onChange(t.name)}
            className={`w-full flex items-center p-4 border rounded-xl transition-all ${
              tone === t.name
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
            }`}
          >
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.description}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                tone === t.name
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              {tone === t.name && <Check className="h-4 w-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneStep;