import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const initialStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: +1.24 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.10, change: -0.45 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.71, change: +0.82 },
  { symbol: 'TSLA', name: 'Tesla', price: 193.57, change: -2.15 },
  { symbol: 'AMZN', name: 'Amazon', price: 174.42, change: +1.10 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 875.28, change: +3.42 },
  { symbol: 'META', name: 'Meta', price: 484.03, change: -0.12 },
  { symbol: 'NFLX', name: 'Netflix', price: 610.56, change: +1.56 },
  { symbol: 'AMD', name: 'AMD', price: 178.33, change: +2.10 },
  { symbol: 'INTC', name: 'Intel', price: 43.52, change: -0.85 },
  { symbol: 'PYPL', name: 'PayPal', price: 62.15, change: +0.45 },
  { symbol: 'SQ', name: 'Square', price: 78.90, change: +1.25 },
  { symbol: 'COIN', name: 'Coinbase', price: 245.60, change: +5.42 },
  { symbol: 'HOOD', name: 'Robinhood', price: 18.25, change: +3.12 },
];

export default function StockTickerSection() {
  const [stockData, setStockData] = useState(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 0.5,
        change: stock.change + (Math.random() - 0.5) * 0.05
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      scale: 0.5,
      rotateY: 45,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <section className="bg-slate-900 border-b border-slate-800 relative z-20 overflow-hidden">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {/* Wave Effect Background */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10 pointer-events-none"
      />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-40 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-40 pointer-events-none" />

        <div className="flex items-center py-4 lg:py-6 gap-0 overflow-hidden relative">
          {/* Fixed Live Indicator */}
          <div className="flex-shrink-0 pr-8 mr-4 border-r border-slate-800/50 flex items-center gap-3 bg-slate-900 z-50 relative">
            <div className="relative">
              <Activity className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Market Live</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Real-time Analysis</p>
            </div>
          </div>

          {/* Infinite Moving Ticker */}
          <motion.div 
            animate={{ x: [0, -3000] }}
            whileHover={{ animationPlayState: "paused" }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear"
              }
            }}
            className="flex items-center gap-0 divide-x divide-slate-800/50 cursor-pointer"
          >
            {[...stockData, ...stockData, ...stockData].map((stock, idx) => (
              <div
                key={`${stock.symbol}-${idx}`}
                className="flex-shrink-0 px-8 flex flex-col justify-center group cursor-default"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors tracking-widest uppercase">{stock.symbol}</span>
                  <div className={`h-1 w-1 rounded-full ${stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-white tabular-nums tracking-tight">
                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className={`flex items-center text-[9px] font-bold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? <TrendingUp className="h-2 w-2 mr-0.5" /> : <TrendingDown className="h-2 w-2 mr-0.5" />}
                    {Math.abs(stock.change).toFixed(2)}%
                  </div>
                </div>

                <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "50%" }}
                    animate={{ width: `${50 + (stock.change * 10)}%` }}
                    className={`h-full ${stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'} opacity-50`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
