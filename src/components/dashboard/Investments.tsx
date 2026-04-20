import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { TrendingUp, ArrowUpRight, ArrowDownLeft, PieChart, BarChart3, X, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Investments() {
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [showInvestNow, setShowInvestNow] = useState(false);
  const [timeframe, setTimeframe] = useState('3M');

  const availableInvestments = [
    { id: 'inv-1', title: "Global Energy Fund", type: "Equity", risk: "Medium", minInvest: "$500" },
    { id: 'inv-2', title: "Tech Growth ETF", type: "ETF", risk: "High", minInvest: "$1,000" },
    { id: 'inv-3', title: "Corporate Bonds", type: "Fixed Income", risk: "Low", minInvest: "$2,000" },
    { id: 'inv-4', title: "Emerging Markets", type: "Equity", risk: "High", minInvest: "$1,500" },
  ];

  const investments = [
    { id: 1, title: "S&P 500 Index Fund", type: "Equity Fund", return: "+12.4%", amount: "$15,000.00", value: "$18,600.00", risk: "Medium", allocation: "40%", description: "Tracks the performance of 500 large companies listed on stock exchanges in the United States." },
    { id: 2, title: "Global Tech ETF", type: "ETF", return: "+24.8%", amount: "$12,000.00", value: "$14,976.00", risk: "High", allocation: "30%", description: "Invests in leading technology companies worldwide, focusing on growth and innovation." },
    { id: 3, title: "US Treasury Bonds", type: "Fixed Income", return: "+4.2%", amount: "$10,000.00", value: "$10,420.00", risk: "Low", allocation: "20%", description: "Government-backed securities providing steady income with minimal risk." },
    { id: 4, title: "Bitcoin", type: "Digital Asset", return: "-5.4%", amount: "$8,000.00", value: "$7,568.00", risk: "Very High", allocation: "10%", isNegative: true, description: "Highly volatile digital currency used as a store of value and speculative asset." },
  ];

  return (
    <>
      <div className="space-y-8">
      <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Portfolio</h2>
          <button 
            onClick={() => setShowInvestNow(true)}
            className="no-round bg-slate-900 px-4 lg:px-6 py-2 lg:py-3 text-[10px] lg:text-sm font-bold text-white hover:bg-primary hover:text-slate-900 transition-all"
          >
            Invest Now
          </button>
        </div>

        <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 no-round border border-slate-200 bg-white p-4 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h3 className="text-base lg:text-lg font-bold text-slate-900">Performance</h3>
              <div className="flex gap-1 lg:gap-2">
                {['1W', '1M', '3M', '1Y', 'ALL'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => setTimeframe(t)}
                    className={`px-2 lg:px-3 py-1 text-[10px] lg:text-xs font-bold transition-all ${t === timeframe ? 'bg-primary text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 lg:h-64 bg-slate-50 flex items-end justify-between px-2 lg:px-4 pb-2 lg:pb-4 gap-1 lg:gap-2">
              {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95].map((h, i) => (
                <div key={i} className="w-full bg-primary/20 hover:bg-primary transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 no-round opacity-0 group-hover:opacity-100 transition-all">${h*100}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="no-round border border-slate-200 bg-white p-4 lg:p-8 space-y-6 lg:space-y-8 shadow-sm">
            <h3 className="text-base lg:text-lg font-bold text-slate-900">Allocation</h3>
            <div className="relative h-32 w-32 lg:h-48 lg:w-48 mx-auto">
              <div className="absolute inset-0 rounded-full border-[10px] lg:border-[16px] border-slate-100" />
              <div className="absolute inset-0 rounded-full border-[10px] lg:border-[16px] border-primary border-t-transparent border-r-transparent rotate-45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[8px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Value</p>
                <p className="text-sm lg:text-xl font-black text-slate-900">$45,000</p>
              </div>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <AllocationItem label="Stocks" value="65%" color="bg-primary" />
              <AllocationItem label="Bonds" value="25%" color="bg-slate-900" />
              <AllocationItem label="Crypto" value="10%" color="bg-slate-300" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-2">
          {investments.map(inv => (
            <InvestmentItem 
              key={inv.id}
              {...inv}
              onClick={() => setSelectedInvestment(inv)}
            />
          ))}
        </div>
      </div>

      {/* Invest Now Modal */}
      <AnimatePresence>
        {showInvestNow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvestNow(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white p-8 no-round shadow-2xl"
            >
              <button 
                onClick={() => setShowInvestNow(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">Invest Now</h3>
              <div className="space-y-4">
                {availableInvestments.map(inv => (
                  <div key={inv.id} className="p-4 border border-slate-100 hover:border-primary transition-all no-round group cursor-pointer flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{inv.title}</p>
                      <p className="text-xs text-slate-500">{inv.type} • Risk: {inv.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">{inv.minInvest}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min. Invest</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowInvestNow(false)}
                className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all"
              >
                View All Opportunities
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Investment Detail Modal */}
      <AnimatePresence>
        {selectedInvestment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvestment(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white p-8 no-round shadow-2xl"
            >
              <button 
                onClick={() => setSelectedInvestment(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 bg-slate-50 flex items-center justify-center text-slate-900 no-round">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedInvestment.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedInvestment.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Value</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{selectedInvestment.value}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Return</p>
                  <p className={`text-3xl font-black mt-1 ${selectedInvestment.isNegative ? 'text-red-500' : 'text-green-500'}`}>{selectedInvestment.return}</p>
                </div>
              </div>

              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Info className="h-5 w-5 text-primary" />
                  Investment Details
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedInvestment.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 no-round">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{selectedInvestment.risk}</p>
                  </div>
                  <div className="p-4 bg-slate-50 no-round">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portfolio Allocation</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{selectedInvestment.allocation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button className="flex-1 no-round bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">
                  Buy More
                </button>
                <button className="flex-1 no-round border border-red-200 text-red-500 py-4 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Opt Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function AllocationItem({ label, value, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 lg:h-3 lg:w-3 ${color}`} />
        <span className="text-[10px] lg:text-sm font-bold text-slate-600">{label}</span>
      </div>
      <span className="text-[10px] lg:text-sm font-black text-slate-900">{value}</span>
    </div>
  );
}

function InvestmentItem({ title, type, return: ret, amount, isNegative = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="no-round border border-slate-200 bg-white p-3 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between hover:border-primary transition-all cursor-pointer group shadow-sm"
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="h-8 w-8 lg:h-12 lg:w-12 bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-primary transition-all">
          <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6" />
        </div>
        <div>
          <h4 className="text-[10px] lg:text-base font-bold text-slate-900 truncate max-w-[80px] lg:max-w-none">{title}</h4>
          <p className="text-[8px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">{type}</p>
        </div>
      </div>
      <div className="text-left lg:text-right mt-2 lg:mt-0">
        <p className="text-xs lg:text-lg font-black text-slate-900">{amount}</p>
        <p className={`text-[10px] lg:text-xs font-bold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>{ret}</p>
      </div>
    </div>
  );
}
