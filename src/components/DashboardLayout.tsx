import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
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
  X as CloseIcon,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';
import { useSearch } from '../context/SearchContext';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

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
    { id: 1, title: "Security Alert", message: "New login detected from Bangkok, TH", time: "2 mins ago", type: "alert", link: "/dashboard/settings" },
    { id: 2, title: "Payment Received", message: "฿85,000.00 deposited to your account", time: "1 hour ago", type: "success", link: "/dashboard/transactions" },
    { id: 3, title: "Card Frozen", message: "Your Platinum Debit card has been frozen", time: "3 hours ago", type: "info", link: "/dashboard/cards" },
  ];

  const sidebarLinks = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: "Overview" },
    { to: "/dashboard/accounts", icon: <Wallet />, label: "Accounts" },
    { to: "/dashboard/cards", icon: <CreditCard />, label: "Cards" },
    { to: "/dashboard/transactions", icon: <History />, label: "Transactions" },
    { to: "/dashboard/investments", icon: <TrendingUp />, label: "Investments" },
  ];

  const searchResults = searchQuery.length > 2 ? [
    { id: 's1', title: "Apple Store", type: "Transaction", link: "/dashboard/transactions" },
    { id: 's2', title: "Savings Account", type: "Account", link: "/dashboard/accounts" },
    { id: 's3', title: "Platinum Card", type: "Card", link: "/dashboard/cards" },
    { id: 's4', title: "Crypto Portfolio", type: "Investment", link: "/dashboard/investments" },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-x-hidden">
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

      {/* Sidebar - Remains Static */}
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
          <div className="hidden lg:block space-y-1">
            {sidebarLinks.map(link => (
              <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} active={location.pathname === link.to} />
            ))}
          </div>
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

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col relative z-20 min-h-screen">
        {/* Header - Remains Static */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900">Welcome Back</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="no-round w-64 border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary"
              />
              
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 shadow-2xl no-round z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Search Results</span>
                      <button onClick={() => setShowSearchResults(false)}><CloseIcon className="h-3 w-3 text-slate-400" /></button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.length > 0 ? searchResults.map(result => (
                        <button 
                          key={result.id}
                          onClick={() => {
                            navigate(result.link);
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="w-full p-4 text-left border-b border-slate-50 hover:bg-slate-50 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-all">{result.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{result.type}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-all" />
                        </button>
                      )) : (
                        <div className="p-8 text-center">
                          <p className="text-xs font-bold text-slate-400">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                          <div 
                            key={n.id} 
                            onClick={() => {
                              navigate(n.link);
                              setShowNotifications(false);
                            }}
                            className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer"
                          >
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
            </div>
          </div>
        </header>

        {/* Page Content - Only this part animates with transmission */}
        <div className="flex-1 p-4 lg:p-12 pb-32 lg:pb-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Navigation - Remains Static */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-around p-2">
            {sidebarLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`flex flex-col items-center gap-1 p-2 transition-all ${location.pathname === link.to ? 'text-primary uppercase' : 'text-slate-400'}`}
              >
                <span className="h-5 w-5">{link.icon}</span>
                <span className="text-[10px] font-black tracking-tighter uppercase">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, active = false, onClick }: { to: string, icon: any, label: string, active?: boolean, onClick?: () => void, key?: string }) {
  return (
    <Link to={to} onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${active ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      {icon && <span className="h-5 w-5">{icon}</span>}
      {label}
    </Link>
  );
}
