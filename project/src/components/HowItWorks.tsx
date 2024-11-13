import React from 'react';
import { 
  ListFilter, 
  FileSearch, 
  Sparkles, 
  Send 
} from 'lucide-react';

const steps = [
  {
    icon: ListFilter,
    title: 'Select Your Industry',
    description: 'Choose from a wide range of industries to tailor content perfectly for your audience.',
  },
  {
    icon: FileSearch,
    title: 'Curate Content',
    description: 'Auto-fetch articles and content relevant to your specific industry and audience.',
  },
  {
    icon: Sparkles,
    title: 'Customize with AI',
    description: 'Use AI suggestions to enhance your newsletter content and engagement.',
  },
  {
    icon: Send,
    title: 'Publish & Send',
    description: 'Distribute through your preferred channels with just one click.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Four simple steps to automated newsletter success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-blue-100" />
              )}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            Start Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;