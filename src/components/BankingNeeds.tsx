import { useState, ReactNode } from 'react';
import { ChevronDown, ArrowRight, Wallet, Globe, Landmark, Briefcase, Smartphone, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BankingNeeds() {
  const [activeTab, setActiveTab] = useState<'individuals' | 'companies'>('individuals');

  const content = {
    individuals: [
      {
        title: "Savings & CDs",
        description: "Maximize your earnings with our high-yield savings accounts and flexible certificate of deposits.",
        footer: "Interest rate up to 5% p.a",
        icon: <Landmark className="h-10 w-10" />
      },
      {
        title: "Online & Mobile",
        description: "Bank anywhere, anytime with our award-winning mobile app and secure online banking portal.",
        footer: "Terms & Conditions",
        icon: <Globe className="h-10 w-10" />
      },
      {
        title: "Consumer Loans",
        description: "Get the financial support you need for your personal goals with our competitive loan rates.",
        footer: "Check today's Interest Rates",
        icon: <Wallet className="h-10 w-10" />
      }
    ],
    companies: [
      {
        title: "Business Checking",
        description: "Streamline your business operations with our comprehensive checking accounts designed for growth.",
        footer: "Open Business Account",
        icon: <Briefcase className="h-10 w-10" />
      },
      {
        title: "Corporate Credit",
        description: "Empower your team with corporate cards that offer deep insights and flexible spending limits.",
        footer: "Request Corporate Card",
        icon: <CreditCard className="h-10 w-10" />
      },
      {
        title: "Commercial Loans",
        description: "Scale your business with our customized lending solutions and expert financial guidance.",
        footer: "Consult Business Expert",
        icon: <Landmark className="h-10 w-10" />
      }
    ]
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" 
          alt="Banking Background"
          className="h-full w-full object-cover opacity-10 grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="text-3xl lg:text-7xl font-bold text-slate-900">Banking For Your Needs</h2>
        <p className="mt-4 text-sm lg:text-base text-slate-500">The bank that builds better relationships.</p>

        <div className="mt-16 flex flex-col gap-6 lg:flex-row">
          {/* Tabs - Scrollable on mobile */}
          <div className="flex flex-1 gap-4 overflow-x-auto pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory">
            <button 
              onClick={() => setActiveTab('individuals')}
              className={`no-round flex flex-1 min-w-[280px] lg:min-w-0 snap-center items-center justify-between p-6 lg:p-8 text-left transition-all ${activeTab === 'individuals' ? 'bg-white shadow-xl border-b-4 border-primary lg:border-0' : 'bg-slate-100/50 hover:bg-white'}`}
            >
              <div>
                <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Banking for</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">Individuals</h3>
              </div>
              <ChevronDown className={`h-5 w-5 lg:h-6 lg:w-6 transition-transform ${activeTab === 'individuals' ? 'rotate-180' : ''}`} />
            </button>
            <button 
              onClick={() => setActiveTab('companies')}
              className={`no-round flex flex-1 min-w-[280px] lg:min-w-0 snap-center items-center justify-between p-6 lg:p-8 text-left transition-all ${activeTab === 'companies' ? 'bg-white shadow-xl border-b-4 border-primary lg:border-0' : 'bg-slate-100/50 hover:bg-white'}`}
            >
              <div>
                <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Banking for</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">Companies</h3>
              </div>
              <ChevronDown className={`h-5 w-5 lg:h-6 lg:w-6 transition-transform ${activeTab === 'companies' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <AnimatePresence mode="wait">
            {content[activeTab].map((item, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FeatureCard 
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  footer={item.footer}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, footer }: { icon: ReactNode; title: string; description: string; footer: string }) {
  return (
    <div className="no-round group relative border border-slate-100 bg-white p-6 lg:p-12 transition-all hover:bg-slate-900 hover:text-white h-full">
      <div className="flex items-center justify-between">
        <div className="text-primary">{icon}</div>
        <button className="no-round flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-900 transition-all group-hover:bg-primary">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <h3 className="mt-8 text-2xl font-bold">{title}</h3>
      <div className="mt-4 h-1 w-12 bg-primary" />
      <p className="mt-6 text-slate-500 group-hover:text-slate-400">{description}</p>
      <p className="mt-8 text-sm font-bold">
        <span className="text-primary">*</span> {footer}
      </p>
    </div>
  );
}

