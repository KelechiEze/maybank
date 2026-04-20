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
          {/* Ethereal Background Elements removed to ensure totally white background */}

          <div className="relative flex flex-col items-center">
            {/* Animated Logo SVG */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-8"
            >
              <svg
                viewBox="0 0 100 100"
                className="h-32 w-32 md:h-48 md:w-48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main "M" Shape */}
                <motion.path
                  d="M20 80V20L50 50L80 20V80"
                  stroke="#0F172A"
                  strokeWidth="10"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Bottom Bar */}
                <motion.path
                  d="M20 80H80"
                  stroke="#FACC15"
                  strokeWidth="10"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
                {/* Central Dot with Pulse */}
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="6" 
                  fill="#FACC15"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                />
              </svg>

              {/* Subtle Outer Ring Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </motion.div>

            {/* Logo Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-900 md:text-5xl">
                MAY <span className="text-primary">BANK</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                className="mt-3 font-mono text-[10px] tracking-[0.5em] uppercase text-slate-400"
              >
                The Future of Finance
              </motion.p>
            </motion.div>
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
