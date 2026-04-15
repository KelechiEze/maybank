/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import { TopBar, Navbar, UpdateBar } from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import News from './components/News';
import GetInTouch from './components/GetInTouch';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Accounts from './components/dashboard/Accounts';
import Cards from './components/dashboard/Cards';
import Transactions from './components/dashboard/Transactions';
import Investments from './components/dashboard/Investments';
import Insurance from './components/dashboard/Insurance';
import Settings from './components/dashboard/Settings';
import NewsDetail from './components/NewsDetail';
import { motion, AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [showGlobalPreloader, setShowGlobalPreloader] = useState(false);

  const isAuthPage = location.pathname === '/login' || 
                    location.pathname === '/forgot-password' || 
                    location.pathname === '/signup' || 
                    location.pathname.startsWith('/dashboard');

  const triggerPreloader = () => {
    setShowGlobalPreloader(true);
    setTimeout(() => {
      setShowGlobalPreloader(false);
    }, 4000);
  };

  useEffect(() => {
    triggerPreloader();
    
    const handleTrigger = () => triggerPreloader();
    window.addEventListener('trigger-preloader', handleTrigger);
    return () => {
      window.removeEventListener('trigger-preloader', handleTrigger);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Preloader show={showGlobalPreloader} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
      >
        {!isAuthPage && <TopBar />}
        {!isAuthPage && <Navbar />}
        {!isAuthPage && <UpdateBar />}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/contact" element={<GetInTouch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route path="/dashboard/cards" element={<Cards />} />
              <Route path="/dashboard/transactions" element={<Transactions />} />
              <Route path="/dashboard/investments" element={<Investments />} />
              <Route path="/dashboard/insurance" element={<Insurance />} />
              <Route path="/dashboard/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        {!isAuthPage && <Footer />}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}


