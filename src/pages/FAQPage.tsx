import React, { useState } from 'react';
import { ChevronRight, HelpCircle, MessageSquare, Info, User, Mail } from 'lucide-react';

const faqs = [
  {
    id: 1,
    icon: <HelpCircle size={20} className="text-teal-600" />,
    question: "How do I create an account?",
    answer: "Click on the Sign Up button at the top right and fill in your details. You’ll receive a confirmation email to activate your account.",
    tags: ["Account", "Signup"],
  },
  {
    id: 2,
    icon: <MessageSquare size={20} className="text-teal-600" />,
    question: "How can I contact customer support?",
    answer: "You can reach our support team via the Contact Us page, email, or phone. We’re available 24/7 to assist you.",
    tags: ["Support", "Contact"],
  },
  {
    id: 3,
    icon: <Info size={20} className="text-teal-600" />,
    question: "Where can I find my order history?",
    answer: "Go to your Profile and select Orders to view your complete order history and details.",
    tags: ["Orders", "Profile"],
  },
  {
    id: 4,
    icon: <User size={20} className="text-teal-600" />,
    question: "How do I update my personal information?",
    answer: "Navigate to Settings > Account to update your name, email, or password.",
    tags: ["Account", "Settings"],
  },
];

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="ml-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQs</h1>
          <p className="text-gray-600">
            Frequently Asked Questions about your account, orders, and more
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No FAQs found matching your search.
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="p-4 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                      {faq.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                      <ChevronRight className="flex-shrink-0 text-gray-400" size={18} />
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {faq.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Help Footer */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-teal-600" />
              <span className="text-gray-700">Chat with support</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-teal-600" />
              <span className="text-gray-700">Email us your question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;