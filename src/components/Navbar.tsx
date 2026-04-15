import { Mail, MapPin, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export function TopBar() {
  return (
    <div className="hidden border-b border-slate-100 bg-white py-2 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-[13px] text-slate-500">
        <div className="flex items-center gap-6">
          <a href="mailto:info@maybank.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            info@maybank.com
          </a>
          <div className="h-4 w-[1px] bg-slate-200" />
          <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
            <MapPin className="h-4 w-4" />
            Find Nearest Branch
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Careers</a>
          <a href="#" className="hover:text-primary transition-colors">Faq's</a>
          <a href="#" className="hover:text-primary transition-colors">Business</a>
          <a href="#" className="hover:text-primary transition-colors">Rewards</a>
          <button className="flex items-center gap-2 font-medium text-slate-900 hover:text-primary transition-colors">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-0">
        {/* Logo */}
        <Link to="/" className="py-4">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <NavItem to="/" label="Home" active={location.pathname === '/'} />
          <NavItem to="/services" label="Services" active={location.pathname === '/services'} />
          <NavItem to="/about" label="About" active={location.pathname === '/about'} />
          <NavItem to="/news" label="News" active={location.pathname === '/news'} />
          <NavItem to="/contact" label="Get In Touch" active={location.pathname === '/contact'} />
        </div>

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="no-round flex items-center gap-2 bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-primary hover:text-slate-900">
              <User className="h-4 w-4" />
              Login
            </Link>
            <Link to="/signup" className="no-round border-2 border-slate-900 px-6 py-3 font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white">
              Open an Account
            </Link>
          </div>

          {/* Mobile Hamburger with Spinning Text */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex h-16 w-16 items-center justify-center lg:hidden"
          >
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <path
                  id="textPath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[10px] font-black uppercase tracking-[0.2em] fill-slate-900">
                  <textPath href="#textPath">
                    MAY BANK • MAY BANK • MAY BANK • 
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="relative z-10 flex h-10 w-10 items-center justify-center bg-primary text-slate-900 shadow-lg">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <Logo />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="h-12 w-12 bg-slate-100 flex items-center justify-center text-slate-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-16 flex flex-col gap-8">
                <MobileNavItem to="/" label="Home" />
                <MobileNavItem to="/services" label="Services" />
                <MobileNavItem to="/about" label="About" />
                <MobileNavItem to="/news" label="News" />
                <MobileNavItem to="/contact" label="Get In Touch" />
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <Link to="/login" className="no-round flex w-full items-center justify-center gap-2 bg-slate-900 py-5 font-black uppercase tracking-widest text-white">
                  <User className="h-5 w-5" />
                  Login
                </Link>
                <Link to="/signup" className="no-round flex w-full items-center justify-center border-2 border-slate-900 py-5 font-black uppercase tracking-widest text-slate-900">
                  Open an Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active?: boolean }) {
  return (
    <Link 
      to={to}
      className={`group relative flex h-24 cursor-pointer items-center gap-1 border-b-4 transition-all ${active ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
    >
      <span className="font-bold">{label}</span>
    </Link>
  );
}

function MobileNavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link 
      to={to}
      className="text-4xl font-black text-slate-900 hover:text-primary transition-colors"
    >
      {label}
    </Link>
  );
}

export function UpdateBar() {
  return (
    <div className="bg-primary py-3 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex items-center">
          {/* Label with background to hide sliding text */}
          <div className="relative z-20 flex items-center gap-2 bg-primary pr-4 font-bold text-slate-900 uppercase">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-slate-900"
            />
            Updates:
          </div>
          
          {/* Sliding Container */}
          <div className="relative z-10 flex-1 overflow-hidden">
            <motion.div
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-24 whitespace-nowrap text-sm font-bold text-slate-900"
            >
              <span>Get upto 4%* on our Savings Account Balances with Maybank. <a href="#" className="underline">More Details</a></span>
              <span>Maximize your wealth by having two accounts: Savings and Current Account for better financial management.</span>
              <span>New: Corporate Banking portal is now live with enhanced security features.</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

