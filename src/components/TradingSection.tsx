import { Check, Smartphone, Percent, Landmark } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function TradingSection() {
  return (
    <section className="bg-slate-900 text-white">
      {/* Trading Update Bar */}
      <div className="bg-primary py-3 overflow-hidden border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center">
            <div className="relative z-20 flex items-center gap-2 bg-primary pr-4 font-bold text-slate-900 uppercase text-xs">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-slate-900"
              />
              Market Alerts:
            </div>
            
            <div className="relative z-10 flex-1 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-24 whitespace-nowrap text-sm font-bold text-slate-900"
              >
                <span>🚀 Zero brokerage on all equity delivery trades for the first 30 days!</span>
                <span>📈 New: Advanced AI-powered technical indicators now available on our web platform.</span>
                <span>🌍 Trade in US Stocks directly from your Maybank Demat account with zero conversion fees.</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          {/* Image Side */}
          <div className="relative lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
              alt="Trading Background"
              className="h-full w-full object-cover opacity-50 grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content Side */}
          <div className="p-8 lg:w-1/2 lg:p-24">
            <span className="font-mono text-xs lg:text-sm tracking-widest text-primary uppercase">Trading & Demat a/c</span>
            <h2 className="mt-4 text-3xl lg:text-6xl font-bold">
              Step To Make <br />
              Your Dreams Possible
            </h2>
            <p className="mt-6 text-sm lg:text-base text-slate-400">
              Experience seamless trading with our advanced platforms. We provide the tools and insights you need to navigate the markets with confidence.
            </p>

            <ul className="mt-10 space-y-4">
              <ListItem text="Zero account opening charges" />
              <ListItem text="Advanced charting tools & indicators" />
              <ListItem text="Instant fund transfer facility" />
              <ListItem text="Dedicated relationship manager" />
            </ul>

            <button className="no-round mt-12 bg-primary px-10 py-4 font-bold text-slate-900 transition-all hover:bg-white">
              Open an Account
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-3">
          <BottomCard 
            icon={<Landmark className="h-10 w-10" />}
            title="Trading & Demat a/c"
            bgColor="bg-slate-800"
          />
          <BottomCard 
            icon={<Percent className="h-10 w-10" />}
            title="Tax Savings a/c"
            bgColor="bg-primary text-slate-900"
          />
          <BottomCard 
            icon={<Landmark className="h-10 w-10" />}
            title="Gold Savings a/c"
            bgColor="bg-slate-700"
          />
        </div>
      </div>
    </section>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex h-5 w-5 items-center justify-center bg-primary text-slate-900">
        <Check className="h-3 w-3 stroke-[4]" />
      </div>
      <span className="text-slate-300">{text}</span>
    </li>
  );
}

function BottomCard({ icon, title, bgColor }: { icon: ReactNode; title: string; bgColor: string }) {
  return (
    <div className={`no-round flex items-center gap-4 lg:gap-6 p-6 lg:p-10 transition-transform hover:-translate-y-1 ${bgColor}`}>
      <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center border border-current/20">
        {icon}
      </div>
      <div>
        <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-70">Maybank</p>
        <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
