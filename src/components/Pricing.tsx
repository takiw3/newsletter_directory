import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    period: '/month',
    features: [
      'Up to 2 newsletters per month',
      'Access to basic templates',
      'Email support',
      'Basic analytics',
    ],
    cta: 'Select Basic',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$59',
    period: '/month',
    features: [
      'Up to 5 newsletters per month',
      'Advanced templates',
      'Priority email support',
      'Integration with email marketing tools',
      'Advanced analytics',
      'Custom branding',
    ],
    cta: 'Select Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited newsletters',
      'Custom templates',
      'Dedicated account manager',
      'API access',
      'White-label solution',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose the Plan That Fits Your Needs
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            14-day free trial with all plans. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border ${
                plan.popular ? 'border-blue-600' : 'border-gray-100'
              } p-8 hover:shadow-lg transition-shadow`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-full font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          Looking for different features?{' '}
          <a href="#contact" className="text-blue-600 hover:text-blue-700">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;