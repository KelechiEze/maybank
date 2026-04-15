import { motion } from 'motion/react';

export default function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-10 w-10 md:h-12 md:w-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 80V20L50 50L80 20V80"
          stroke={light ? "#FFFFFF" : "#0F172A"}
          strokeWidth="12"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M20 80H80"
          stroke="#FACC15"
          strokeWidth="12"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <circle cx="50" cy="50" r="8" fill="#FACC15" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`text-xl font-black tracking-tighter md:text-2xl ${light ? 'text-white' : 'text-slate-900'}`}>MAY</span>
        <span className="text-lg font-bold tracking-tighter text-primary md:text-xl">BANK</span>
      </div>
    </div>
  );
}
