import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI personalize my newsletters?",
    answer: "Our AI analyzes your selected industry and audience to suggest relevant content and phrasing. It learns from successful newsletters in your industry to provide tailored recommendations that resonate with your readers."
  },
  {
    question: "Can I edit the AI-generated content?",
    answer: "Absolutely! You have full control to edit and customize all content. Our AI serves as a powerful assistant, providing suggestions while leaving you in complete control of the final output."
  },
  {
    question: "What email marketing tools do you support?",
    answer: "We support all major platforms including Mailchimp, Constant Contact, Sendinblue, HubSpot, Campaign Monitor, and more. We also offer API access for custom integrations."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial with no credit card required. This gives you full access to all features so you can experience the power of automated newsletter creation."
  },
  {
    question: "How secure is my data?",
    answer: "We use industry-standard encryption and security measures to protect your data. Our servers are hosted in secure facilities, and we regularly perform security audits to ensure your information stays safe."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="faqs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about Auto Newsletter
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <button
                className="w-full flex items-center justify-between p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-left text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border border-t-0 border-gray-100 rounded-b-xl">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;