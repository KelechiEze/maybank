import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

const carouselImages = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
];

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Image Carousel */}
      <div className="relative hidden w-1/2 lg:block overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentImage]} 
              alt="Banking" 
              className="h-full w-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <Link to="/">
            <Logo light />
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Secure Your <br />
              <span className="text-primary">Financial Future</span>
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              We use advanced encryption and multi-factor authentication to keep your account safe.
            </p>
          </div>

          <div className="flex gap-2">
            {carouselImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 ${i === currentImage ? 'w-12 bg-primary' : 'w-4 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Multi-step Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-bold text-slate-900">Forgot Password?</h1>
                <p className="mt-4 text-slate-500">Enter your email address and we'll send you an OTP to reset your password.</p>
                <form onSubmit={handleNext} className="mt-12 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="email" 
                        placeholder="name@company.com"
                        className="no-round w-full border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-bold text-slate-900 outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 flex items-center justify-center gap-3">
                    Send OTP
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-bold text-slate-900">Verify OTP</h1>
                <p className="mt-4 text-slate-500">We've sent a 6-digit code to your email. Please enter it below.</p>
                <form onSubmit={handleNext} className="mt-12 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">OTP Code</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <input 
                          key={i}
                          required
                          type="text" 
                          maxLength={1}
                          className="no-round w-full border border-slate-200 bg-slate-50 py-4 text-center font-black text-2xl text-slate-900 outline-none focus:border-primary transition-all"
                        />
                      ))}
                    </div>
                  </div>
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 flex items-center justify-center gap-3">
                    Verify Code
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-center text-sm font-medium text-slate-500">
                    Didn't receive code? <button type="button" className="font-bold text-primary hover:underline">Resend OTP</button>
                  </p>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-bold text-slate-900">New Password</h1>
                <p className="mt-4 text-slate-500">Create a strong password to protect your account.</p>
                <form onSubmit={handleNext} className="mt-12 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="no-round w-full border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 font-bold text-slate-900 outline-none focus:border-primary transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="no-round w-full border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 font-bold text-slate-900 outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 flex items-center justify-center gap-3">
                    Reset Password
                    <ShieldCheck className="h-5 w-5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
