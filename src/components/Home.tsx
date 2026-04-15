import Hero from './Hero';
import TradingSection from './TradingSection';
import EMICalculator from './EMICalculator';
import FAQSection from './FAQSection';
import ForexSection from './ForexSection';
import BankingNeeds from './BankingNeeds';
import { motion } from 'motion/react';
import { Shield, Smartphone, Globe, CreditCard, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Secure Banking"
              description="Multi-layer encryption and biometric security to keep your assets safe."
            />
            <FeatureCard 
              icon={<Smartphone className="h-8 w-8 text-primary" />}
              title="Mobile First"
              description="Manage your finances on the go with our award-winning mobile application."
            />
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-primary" />}
              title="Global Reach"
              description="Seamless international transfers and multi-currency accounts."
            />
            <FeatureCard 
              icon={<CreditCard className="h-8 w-8 text-primary" />}
              title="Smart Cards"
              description="Customizable credit and debit cards with instant freeze capabilities."
            />
          </div>
        </div>
      </section>

      <BankingNeeds />
      <TradingSection />
      <EMICalculator />
      <ForexSection />
      <FAQSection />

      {/* About Section (Sharp Edges) */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Banking"
                  className="no-round h-[500px] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="no-round absolute -bottom-6 -right-6 hidden h-48 w-48 bg-primary p-8 md:block">
                  <p className="text-4xl font-black text-slate-900">25+</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wider text-slate-900">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
                Redefining the <br />
                <span className="text-primary">Financial Landscape</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600">
                At May Bank, we believe that banking should be as dynamic as your life. Our mission is to provide innovative financial solutions that are accessible, transparent, and tailored to your unique needs.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-slate-900">1.2M+</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">$45B+</p>
                  <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Assets Managed</p>
                </div>
              </div>
              <button className="no-round mt-12 flex items-center gap-2 bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-primary hover:text-slate-900">
                Learn More About Us
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="no-round border border-slate-100 bg-white p-10 transition-all hover:border-primary hover:shadow-xl"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-slate-600">{description}</p>
    </motion.div>
  );
}
