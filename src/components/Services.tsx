import { motion } from 'motion/react';
import { CreditCard, Landmark, Briefcase, Smartphone, Shield, Zap, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

export default function Services() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" 
            alt="Services Hero"
            className="h-full w-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-white md:text-7xl"
          >
            Our <span className="text-primary">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto px-6"
          >
            Comprehensive financial solutions tailored for your personal and business growth.
          </motion.p>
        </div>
      </section>

      {/* Personal Banking */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900">Personal Banking</h2>
              <p className="mt-6 text-slate-600 text-lg">
                Manage your daily finances with ease. From high-interest savings accounts to flexible current accounts, we provide the tools you need to succeed.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem icon={<Landmark />} title="Savings Accounts" />
                <ServiceItem icon={<CreditCard />} title="Debit & Credit Cards" />
                <ServiceItem icon={<Zap />} title="Instant Transfers" />
                <ServiceItem icon={<Shield />} title="Fraud Protection" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000" 
                alt="Personal Banking"
                className="no-round w-full h-[400px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Banking */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900">Corporate Banking</h2>
              <p className="mt-6 text-slate-600 text-lg">
                Empowering businesses with scalable financial infrastructure. Our corporate services are designed to handle complex transactions and global operations.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceItem icon={<Briefcase />} title="Business Loans" />
                <ServiceItem icon={<Globe />} title="Trade Finance" />
                <ServiceItem icon={<Smartphone />} title="Merchant Services" />
                <ServiceItem icon={<Landmark />} title="Treasury Management" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Corporate Banking"
                className="no-round w-full h-[400px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Digital Solutions */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Digital-First Banking</h2>
          <p className="mt-4 text-slate-800 max-w-2xl mx-auto">
            Experience the future of finance with our cutting-edge digital platforms. Secure, fast, and available 24/7.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <DigitalCard 
              title="Mobile App" 
              description="Full banking control in the palm of your hand." 
            />
            <DigitalCard 
              title="Online Portal" 
              description="Advanced features for complex financial management." 
            />
            <DigitalCard 
              title="API Integration" 
              description="Connect your business directly to our banking core." 
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceItem({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all">
        {icon}
      </div>
      <span className="font-bold text-slate-900">{title}</span>
    </div>
  );
}

function DigitalCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-10 no-round shadow-lg text-left"
    >
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-slate-600">{description}</p>
      <button className="mt-8 flex items-center gap-2 font-bold text-primary group">
        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
