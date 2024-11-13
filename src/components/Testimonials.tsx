import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Auto Newsletter has revolutionized our marketing efforts! The AI-powered content suggestions are spot-on, and we've seen a 40% increase in engagement.",
    author: "Sarah L.",
    position: "Marketing Director",
    company: "Tech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "We've saved countless hours and increased engagement by 50%. The industry-specific content curation is exactly what we needed.",
    author: "Mark P.",
    position: "Owner",
    company: "Fresh Foods",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Hear from Our Happy Clients
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Success stories from businesses like yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <Quote className="h-8 w-8 text-blue-600 mb-6" />
              <p className="text-lg text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#case-studies"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            View Case Studies
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;