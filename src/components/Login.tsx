import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

const carouselImages = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger global preloader via custom event
    window.dispatchEvent(new CustomEvent('trigger-preloader'));
    
    // Simulate login delay with preloader
    setTimeout(() => {
      navigate('/dashboard');
    }, 3500);
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
            <motion.h2 
              key={currentImage}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-white leading-tight"
            >
              Experience the <br />
              <span className="text-primary">Future of Banking</span>
            </motion.h2>
            <p className="mt-6 text-lg text-slate-300">
              Secure, fast, and intuitive financial solutions designed for your modern lifestyle.
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

      {/* Right Side - Login Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-4 text-slate-500">Please enter your details to sign in to your account.</p>

          <form onSubmit={handleLogin} className="mt-12 space-y-6">
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" title="Reset Password" className="text-sm font-bold text-primary hover:underline">Forgot Password?</Link>
              </div>
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

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="h-4 w-4 no-round accent-primary" />
              <label htmlFor="remember" className="text-sm font-medium text-slate-600">Remember me for 30 days</label>
            </div>

            <button type="submit" className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account? <Link to="/signup" className="font-bold text-slate-900 hover:text-primary">Open an Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
