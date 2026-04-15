import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  History, 
  Settings, 
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Shield,
  Camera,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import Logo from './Logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate verification for sensitive action (profile pic update)
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 2000);
    }
  };

  const notifications = [
    { id: 1, title: "Security Alert", message: "New login detected from Bangkok, TH", time: "2 mins ago", type: "alert" },
    { id: 2, title: "Payment Received", message: "฿85,000.00 deposited to your account", time: "1 hour ago", type: "success" },
    { id: 3, title: "Card Frozen", message: "Your Platinum Debit card has been frozen", time: "3 hours ago", type: "info" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 h-full w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:flex lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-8">
          <Logo />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-900"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-1 px-4">
          <SidebarLink to="/dashboard" icon={<LayoutDashboard />} label="Overview" active={location.pathname === '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink to="/dashboard/accounts" icon={<Wallet />} label="Accounts" active={location.pathname === '/dashboard/accounts'} onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink to="/dashboard/cards" icon={<CreditCard />} label="Cards" active={location.pathname === '/dashboard/cards'} onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink to="/dashboard/transactions" icon={<History />} label="Transactions" active={location.pathname === '/dashboard/transactions'} onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink to="/dashboard/investments" icon={<TrendingUp />} label="Investments" active={location.pathname === '/dashboard/investments'} onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink to="/dashboard/insurance" icon={<Shield />} label="Insurance" active={location.pathname === '/dashboard/insurance'} onClick={() => setIsMobileMenuOpen(false)} />
        </nav>

        <div className="border-t border-slate-100 p-4 space-y-1">
          <SidebarLink to="/dashboard/settings" icon={<Settings />} label="Settings" active={location.pathname === '/dashboard/settings'} onClick={() => setIsMobileMenuOpen(false)} />
          <Link to="/login" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900">May Bank Portal</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="no-round w-64 border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary"
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-900 transition-all"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Backdrop for mobile */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
                    />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="fixed lg:absolute right-4 lg:right-0 left-4 lg:left-auto top-24 lg:top-auto mt-0 lg:mt-4 w-auto lg:w-80 bg-white border border-slate-200 shadow-2xl no-round z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="lg:hidden text-slate-400 hover:text-slate-900"
                        >
                          <CloseIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="max-h-[60vh] lg:max-h-96 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-bold text-slate-900">{n.title}</p>
                              <span className="text-[10px] text-slate-400">{n.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-3 text-xs font-bold text-primary hover:bg-slate-50 transition-all">View All Notifications</button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-slate-900 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-md">
                {isUploading ? (
                  <div className="h-full w-full bg-slate-900/50 flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : profilePic ? (
                  <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="h-full w-full object-cover" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 h-5 w-5 bg-slate-900 text-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-slate-900 transition-all shadow-lg z-10">
                <Camera className="h-3 w-3" />
                <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} />
              </label>
              
              {isUploading && (
                <div className="absolute top-12 right-0 w-48 bg-white shadow-xl border border-slate-100 p-3 no-round z-50">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Verifying credentials...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, label, active = false, onClick }: { to: string, icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link to={to} onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${active ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      {icon && <span className="h-5 w-5">{icon}</span>}
      {label}
    </Link>
  );
}
