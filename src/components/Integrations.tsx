import React from 'react';
import { Zap } from 'lucide-react';

const integrations = [
  {
    name: 'Mailchimp',
    description: 'Seamlessly sync your newsletters with Mailchimp campaigns.',
    icon: '📧',
  },
  {
    name: 'Constant Contact',
    description: 'Direct integration with Constant Contact for easy distribution.',
    icon: '✉️',
  },
  {
    name: 'Sendinblue',
    description: 'Automatically push content to your Sendinblue account.',
    icon: '📨',
  },
  {
    name: 'HubSpot',
    description: 'Connect with HubSpot for advanced marketing automation.',
    icon: '🎯',
  },
  {
    name: 'Campaign Monitor',
    description: 'Streamline your workflow with Campaign Monitor integration.',
    icon: '📊',
  },
  {
    name: 'Custom API',
    description: 'Build custom integrations with our robust API.',
    icon: '⚡',
  },
];

const Integrations = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Seamless Integration with Your Favorite Tools
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Connect with leading email marketing platforms in just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{integration.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {integration.name}
                </h3>
              </div>
              <p className="text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-4 bg-blue-50 rounded-2xl">
            <Zap className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-gray-700">
              Need a custom integration?{' '}
              <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Let's talk
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;