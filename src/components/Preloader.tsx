import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader({ show }: { show?: boolean }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (show !== undefined) {
      setIsVisible(show);
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Ethereal Background Elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              opacity: [0, 0.15, 0.1],
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute h-[600px] w-[600px] rounded-full bg-primary blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-1 bg-primary" />
              <h1 className="text-6xl font-black tracking-tighter uppercase text-slate-900 md:text-8xl">
                MAY <span className="text-primary glow-text">BANK</span>
              </h1>
            </motion.div>

            {/* Progress Line */}
            <div className="mt-8 h-[2px] w-64 overflow-hidden bg-slate-100">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="h-full w-full bg-primary"
              />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-4 font-mono text-xs tracking-[0.3em] uppercase text-slate-400"
            >
              The Future of Finance
            </motion.p>
          </div>

          {/* Decorative Corner Lines */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute inset-12 border-t border-l border-slate-100"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute inset-12 flex items-end justify-end"
          >
            <div className="h-full w-full border-b border-r border-slate-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
