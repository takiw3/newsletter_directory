import React from 'react';
import { 
  Building2, 
  Newspaper, 
  Bot, 
  Share2, 
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Industry Selection',
    description: 'Personalize content by selecting your industry for targeted newsletters.',
  },
  {
    icon: Newspaper,
    title: 'Automated Content Curation',
    description: 'Fetch relevant articles and media stories instantly with smart algorithms.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Creation',
    description: 'Leverage advanced AI to craft engaging newsletters that resonate with your audience.',
  },
  {
    icon: Share2,
    title: 'Seamless Integration',
    description: 'Publish directly to your favorite email marketing tools without friction.',
  },
  {
    icon: Clock,
    title: 'Time-Saving Automation',
    description: 'Automate your workflow and focus on strategic tasks that matter most.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Auto Newsletter?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful features to transform your newsletter workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;