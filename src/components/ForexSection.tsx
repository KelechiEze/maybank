import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface Rate {
  code: string;
  flag: string;
  send: number;
  receive: number;
}

export default function ForexSection() {
  const [activeTab, setActiveTab] = useState('send');
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      
      const baseRates = [
        { code: 'EUR', flag: '🇪🇺' },
        { code: 'GBP', flag: '🇬🇧' },
        { code: 'JPY', flag: '🇯🇵' },
        { code: 'AUD', flag: '🇦🇺' },
        { code: 'CAD', flag: '🇨🇦' },
        { code: 'SEK', flag: '🇸🇪' }
      ];

      const processedRates = baseRates.map(base => {
        const rate = data.rates[base.code];
        return {
          code: base.code,
          flag: base.flag,
          send: Number((rate * 0.98).toFixed(2)),
          receive: Number((rate * 1.02).toFixed(2))
        };
      });

      setRates(processedRates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching forex rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-900 py-24 text-white overflow-hidden">
      {/* Background Graph Decoration */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path 
            d="M0,800 L100,750 L200,780 L300,700 L400,720 L500,600 L600,650 L700,500 L800,550 L900,400 L1000,450" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            animate={{ d: ["M0,800 L100,750 L200,780 L300,700 L400,720 L500,600 L600,650 L700,500 L800,550 L900,400 L1000,450", "M0,820 L100,770 L200,800 L300,720 L400,740 L500,620 L600,670 L700,520 L800,570 L900,420 L1000,470", "M0,800 L100,750 L200,780 L300,700 L400,720 L500,600 L600,650 L700,500 L800,550 L900,400 L1000,450"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold md:text-7xl">Foreign Exchange Rates</h2>
          <div className="mt-4 flex items-center justify-center gap-4 text-slate-400">
            <p>Real-time market rates for global currencies.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Last Updated: {lastUpdated || 'Loading...'}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-4">
          <button 
            onClick={() => setActiveTab('send')}
            className={`no-round border px-8 py-3 font-bold transition-all ${activeTab === 'send' ? 'border-primary text-primary' : 'border-slate-700 text-slate-500 hover:text-white'}`}
          >
            Money Send & Receive
          </button>
          <button 
            onClick={() => setActiveTab('forex')}
            className={`no-round border px-8 py-3 font-bold transition-all ${activeTab === 'forex' ? 'border-primary text-primary' : 'border-slate-700 text-slate-500 hover:text-white'}`}
          >
            Load & Redeem Forex Card
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {rates.map((rate, index) => (
              <motion.div 
                key={rate.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="no-round border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center p-8">
                  <span className="text-4xl">{rate.flag}</span>
                  <span className="mt-4 font-black tracking-widest">{rate.code}</span>
                </div>
                <div className="border-t border-slate-800">
                  <div className="flex justify-between p-4 text-xs font-bold">
                    <span className="text-slate-500 uppercase">Send</span>
                    <span>{rate.send}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 p-4 text-xs font-bold">
                    <span className="text-slate-500 uppercase">Receive</span>
                    <span>{rate.receive}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest group">
            <span className="h-1 w-8 bg-primary transition-all group-hover:w-12" />
            Click to Get Assistant
          </button>
        </div>
      </div>
    </section>
  );
}
