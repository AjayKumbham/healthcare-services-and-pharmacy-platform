import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I order medications?',
    answer: 'You can order medications by uploading your prescription through our secure platform or by contacting our support team. We ensure a seamless process with verification and quick processing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and various digital payment methods including PayPal and mobile wallets. All transactions are secured with industry-standard encryption.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 1-3 business days depending on your location. Premium members get access to express delivery options. Track your order in real-time through our platform.',
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes, we use industry-standard encryption and follow strict HIPAA compliance guidelines to protect all your personal and medical information. Our systems are regularly audited for security.',
  },
];

const FAQ = forwardRef((props, ref) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2A6041] text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-[#F5F5F5] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#E8F5E9]"
            >
              <button
                className="w-full px-8 py-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-[#2A6041] pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-[#4CAF50] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  className={`mt-4 text-gray-600 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="pb-4">{faq.answer}</p>
                </div>
              </button>
              <div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] transform origin-left transition-transform duration-300"
                style={{
                  transform: `scaleX(${openIndex === index ? 1 : 0})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FAQ;