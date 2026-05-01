import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt="Banking background"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            <h1 className="text-4xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl">
              Bank with the <br />
              <span className="text-primary">Happiest Customers</span> <br />
              in the World
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-200 md:text-lg">
              Experience the next generation of digital banking. We combine cutting-edge technology with human-centric service to empower your financial future.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {/* COMMENTED OUT - Open an Account Button
            <Link to="/signup" className="no-round group flex items-center gap-2 bg-white px-6 py-3 font-bold text-slate-900 transition-all hover:bg-primary">
              Open an Account
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            */}
            
            {/* COMMENTED OUT - Login Button
            <Link to="/login" className="no-round group flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-6 py-3 font-bold text-white transition-all hover:bg-primary hover:text-slate-900 border border-white/20">
              Login to Portal
            </Link>
            */}
          </motion.div>
        </div>
      </div>

      {/* Side Actions (from image) */}
      <div className="absolute bottom-12 right-0 z-20 hidden flex-col gap-1 md:flex">
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 4.8 }}
        >
          <Link to="/make-payment" className="no-round flex items-center gap-4 bg-primary px-8 py-4 font-bold text-slate-900 transition-all hover:bg-white">
            Make Payment
            <Play className="h-4 w-4 fill-current" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 5 }}
        >
          <Link to="/contact" className="no-round flex items-center gap-4 bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:bg-primary">
            Make an Enquiry
            <Play className="h-4 w-4 fill-current" />
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute left-12 bottom-12 z-20 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 ${
              i === currentIndex ? "w-12 bg-primary" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}