import { useState } from 'react';
import { Search, ArrowRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What is the minimum balance?",
    answer: "The minimum balance required for a standard savings account is $100. However, this may vary based on the account type you choose."
  },
  {
    question: "What is the rate of interest?",
    answer: "Our current interest rates range from 3.5% to 5.25% p.a. depending on the tenure and type of deposit."
  },
  {
    question: "When will I receive my account statement?",
    answer: "Account statements are generated monthly and sent to your registered email address. You can also download them anytime via our mobile app."
  },
  {
    question: "Can I use any branch across the country?",
    answer: "Yes, May Bank offers 'Anywhere Banking' facilities. You can perform transactions at any of our branches nationwide.",
    highlight: true
  },
  {
    question: "How safe/secure is our net banking a/c?",
    answer: "We use industry-leading 256-bit encryption and multi-factor authentication to ensure your online banking experience is completely secure."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold text-slate-900">Questions & Answers</h2>
            <p className="mt-4 text-slate-500">Find answers to all your queries about our service.</p>
            
            <div className="mt-12">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000" 
                alt="FAQ Illustration"
                className="no-round h-[450px] w-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2">
            <div className="mb-8 flex flex-col items-end">
              <p className="text-sm font-bold text-slate-500">Help You to Find</p>
              <div className="no-round mt-2 flex w-full max-w-xs items-center border border-slate-200 bg-white px-4 py-3">
                <input 
                  type="text" 
                  placeholder="Related Keyword..." 
                  className="w-full bg-transparent outline-none"
                />
                <Search className="h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="no-round border border-slate-100 bg-white">
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className={`flex w-full items-center justify-between p-6 text-left transition-all ${openIndex === index ? 'text-primary' : 'text-slate-900 hover:text-primary'}`}
                  >
                    <div className="flex items-center gap-4">
                      {openIndex === index ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : (
                        <ArrowRight className="h-5 w-5" />
                      )}
                      <span className={`text-lg font-bold ${faq.highlight && openIndex !== index ? 'text-primary' : ''}`}>
                        {faq.question}
                      </span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-16 pb-6 text-slate-500">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
