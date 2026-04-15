import { Apple, Play, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Fixed Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center bg-primary text-slate-900 shadow-2xl transition-all hover:bg-white"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call to Action Section */}
      <section className="relative overflow-hidden border-b border-slate-800 py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000" 
            alt="Digital World"
            className="h-full w-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-6xl">Experience a New Digital World.</h2>
          <p className="mt-4 text-lg text-slate-400">Mobile banking application with new & exciting features.</p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <button className="no-round flex items-center gap-3 bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:bg-primary">
              <Play className="h-5 w-5 fill-current" />
              Download
            </button>
            <button className="no-round flex items-center gap-3 bg-primary px-8 py-4 font-bold text-slate-900 transition-all hover:bg-white">
              <Apple className="h-5 w-5 fill-current" />
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn 
            title="Loans"
            links={["Home Loan", "Personal Loan", "Vehicle Loan", "Education Loan", "Gold Loan", "Low Interest", "Our All Cards"]}
          />
          <FooterColumn 
            title="Rates & Charges"
            links={["About Us", "Testimonials", "Careers", "Career Detail", "Faq's", "List View", "Get In Touch"]}
          />
          <FooterColumn 
            title="About Us"
            links={["About Us", "Board of Directors", "Careers", "Career Detail", "Business", "Faq's", "Testimonials"]}
          />
          <FooterColumn 
            title="Services"
            links={["All Accounts", "Home Loan", "Personal Loan", "Vehicle Loan", "Education Loan", "Gold Loan", "Our All Cards"]}
          />
        </div>

        <div className="mt-24 flex flex-col items-center justify-between border-t border-slate-800 pt-12 md:flex-row">
          <Logo light />
          <p className="mt-6 text-sm text-slate-500 md:mt-0">
            © 2026 May Bank. All rights reserved. Member FDIC. Equal Housing Lender.
          </p>
          <div className="h-12 w-12 md:block hidden" /> {/* Spacer for symmetry */}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <a href="#" className="text-slate-400 transition-all hover:text-primary hover:translate-x-1 inline-block">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
