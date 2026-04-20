import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, ShieldCheck, X, Building, Calculator, LineChart } from 'lucide-react';

const advertisements = [
  {
    id: 1,
    title: "Platinum Privilege",
    subtitle: "5% CASHBACK ON TRAVEL",
    description: "Experience the world with unparalleled rewards. Upgrade to May Bank Platinum today.",
    image: "https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80&w=1200",
    cta: "Upgrade Now",
    color: "bg-slate-900"
  },
  {
    id: 2,
    title: "Dream Home Loans",
    subtitle: "RATES FROM 2.45% P.A.",
    description: "Lower rates, higher possibilities. Get pre-approved in minutes with our instant estimator.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    cta: "Check Eligibility",
    color: "bg-primary"
  },
  {
    id: 3,
    title: "Wealth Management",
    subtitle: "AI-DRIVEN INSIGHTS",
    description: "Let our advanced algorithms guide your investment strategy for maximum returns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    cta: "Start Investing",
    color: "bg-blue-900"
  }
];

export default function PromotionalCarousel({ totalBalance = 0 }: { totalBalance?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processStep, setProcessStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showProcessModal) handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, showProcessModal]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const startProcess = () => {
    setShowProcessModal(true);
    setProcessStep(1);
  };

  const handleProcessNext = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessStep(prev => prev + 1);
    }, 1500);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const activeAd = advertisements[currentIndex];
  // Eligibility logic: balance > $500,000
  const isEligible = totalBalance > 500000;

  return (
    <>
      <div className="relative w-full h-[220px] lg:h-[280px] bg-slate-900 overflow-hidden rounded-lg lg:no-round shadow-xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex"
          >
            {/* Content Side */}
            <div className="w-full lg:w-2/5 p-6 lg:p-12 flex flex-col justify-center relative z-20 bg-transparent lg:bg-white">
              <span className="text-[10px] lg:text-xs font-black tracking-[0.3em] text-primary mb-2 block uppercase glow-text">
                {activeAd.subtitle}
              </span>
              <h2 className="text-xl lg:text-4xl font-black text-white lg:text-slate-900 leading-tight mb-3">
                {activeAd.title}
              </h2>
              <p className="text-xs lg:text-base text-slate-200 lg:text-slate-500 max-w-md mb-6 lg:mb-8 line-clamp-2 md:line-clamp-none">
                {activeAd.description}
              </p>
              <button 
                onClick={startProcess}
                className="w-fit flex items-center gap-2 lg:gap-3 bg-transparent text-primary lg:text-slate-900 px-0 lg:px-8 py-2 lg:py-4 no-round text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:text-white lg:hover:text-primary transition-all border-none"
              >
                {activeAd.cta}
                <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Side - Fixed and Centered for Mobile */}
            <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-3/5 overflow-hidden z-10">
              <img 
                src={activeAd.image} 
                alt={activeAd.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out object-center"
                referrerPolicy="no-referrer"
              />
              {/* Dark Overlay for Mobile Readability */}
              <div className="absolute inset-0 bg-slate-900/60 lg:hidden" />
              {/* Gradient overlay to blend image with content on Desktop */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-slate-900/60 lg:from-white lg:via-white/40 to-transparent z-10" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute right-6 bottom-6 z-30 flex gap-4 lg:gap-1">
          <button 
            onClick={handlePrev}
            className="p-1 lg:p-3 bg-transparent text-white lg:text-slate-900 hover:text-primary transition-all"
          >
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
          <button 
            onClick={handleNext}
            className="p-1 lg:p-3 bg-transparent text-white lg:text-slate-900 hover:text-primary transition-all"
          >
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute left-6 bottom-6 z-30 flex gap-3">
          {advertisements.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 transition-all duration-500 no-round ${i === currentIndex ? 'w-12 bg-primary' : 'w-3 bg-slate-200 lg:bg-slate-300/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Process Modal */}
      <AnimatePresence>
        {showProcessModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProcessModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white no-round shadow-2xl p-8 lg:p-12 overflow-hidden"
            >
              <button 
                onClick={() => setShowProcessModal(false)}
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative z-10">
                {processStep === 1 && (
                  <div className="text-center">
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center bg-slate-100 text-slate-900 no-round shadow-inner">
                      {activeAd.id === 1 ? <ShieldCheck className="h-10 w-10" /> : 
                       activeAd.id === 2 ? <Calculator className="h-10 w-10" /> : 
                       <LineChart className="h-10 w-10" />}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">{activeAd.cta}</h3>
                    <p className="text-slate-500 mb-8 font-medium">We are analyzing your profile to provide the best possible experience for our {activeAd.title} service.</p>
                    
                    {activeAd.id === 2 && (
                      <div className="mb-8 p-4 bg-slate-50 no-round border border-slate-100 text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pre-Check Status</p>
                        <p className="text-sm font-bold text-slate-900">Validating eligibility based on current holdings...</p>
                      </div>
                    )}

                    <button 
                      onClick={handleProcessNext}
                      disabled={isProcessing}
                      className="w-full bg-slate-900 py-4 font-black text-white hover:bg-primary hover:text-slate-900 transition-all flex items-center justify-center gap-3 no-round"
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : "Confirm & Continue"}
                    </button>
                  </div>
                )}

                {processStep === 2 && (
                  <div className="text-center">
                    {activeAd.id === 2 ? (
                      <div>
                        <div className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center no-round shadow-xl ${isEligible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {isEligible ? <CheckCircle2 className="h-12 w-12" /> : <X className="h-12 w-12" />}
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">
                          {isEligible ? "Congratulations!" : "Application Pending"}
                        </h3>
                        <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                          {isEligible 
                            ? `You are eligible for our Dream Home Loan at 2.45% P.A. with your current balance of $${totalBalance.toLocaleString()}.` 
                            : `Based on your current balance of $${totalBalance.toLocaleString()}, you don't meet the immediate eligibility threshold ($500,000). Our consultants will contact you shortly to discuss bespoke options.`}
                        </p>
                        <button 
                          onClick={() => setShowProcessModal(false)}
                          className="w-full bg-slate-900 py-4 font-black text-white hover:bg-primary hover:text-slate-900 transition-all no-round"
                        >
                          {isEligible ? "Complete Application" : "Talk to Agent"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center bg-green-100 text-green-600 no-round shadow-xl">
                          <CheckCircle2 className="h-12 w-12" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">Profile Verified</h3>
                        <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                          Your profile has been successfully matched for {activeAd.title}. A dedicated account manager will be assigned to your case within the next 24 hours.
                        </p>
                        <button 
                          onClick={() => setShowProcessModal(false)}
                          className="w-full bg-slate-900 py-4 font-black text-white hover:bg-primary hover:text-slate-900 transition-all no-round"
                        >
                          Finish
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Modal Background Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl p-none pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full -ml-16 -mb-16 blur-3xl p-none pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
