import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Shield, CheckCircle2, ArrowRight, Heart, Car, Home, X, Info, AlertCircle, FileText, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OTPInput from '../ui/OTPInput';

export default function Insurance() {
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isOptingIn, setIsOptingIn] = useState(false);
  const [optInStep, setOptInStep] = useState(1); // 1: Details, 2: PIN, 3: OTP, 4: Success
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');

  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    const initialPolicies = [
      { 
        id: 'POL-88210-X', 
        icon: <Heart />, 
        title: "Life Protection Plus", 
        coverage: "$150,000.00", 
        premium: "$75.00 / mo",
        status: "Active",
        beneficiary: "Jane Doe",
        startDate: "Jan 12, 2022",
        description: "Comprehensive life insurance providing financial security for your loved ones in case of unforeseen events."
      },
      { 
        id: 'POL-12459-C', 
        icon: <Car />, 
        title: "Premium Auto Care", 
        coverage: "$35,000.00", 
        premium: "$55.00 / mo",
        status: "Active",
        beneficiary: "Self",
        startDate: "Mar 05, 2023",
        description: "Full coverage for your vehicle, including accident repair, theft protection, and third-party liability."
      }
    ];

    const saved = JSON.parse(localStorage.getItem('maybank_policies') || 'null');
    if (!saved) {
      localStorage.setItem('maybank_policies', JSON.stringify(initialPolicies.map(p => ({ ...p, icon: p.id })))); // Store ID for icon mapping
      setPolicies(initialPolicies);
    } else {
      // Map back icons
      const mapped = saved.map((p: any) => {
        if (p.id.includes('POL-88210')) return { ...p, icon: <Heart /> };
        if (p.id.includes('POL-12459')) return { ...p, icon: <Car /> };
        if (p.id.includes('home')) return { ...p, icon: <Home /> };
        if (p.id.includes('travel')) return { ...p, icon: <Globe /> };
        if (p.id.includes('health')) return { ...p, icon: <Heart /> };
        return { ...p, icon: <Shield /> };
      });
      setPolicies(mapped);
    }
  }, []);

  const availablePlans = [
    {
      id: 'plan-home',
      icon: <Home />,
      title: "Home Secure",
      description: "Protect your home and belongings against all risks including fire, theft, and natural disasters.",
      image: "https://picsum.photos/seed/home-insurance/800/600",
      premium: "$45.00 / mo",
      coverage: "Up to $500,000",
      features: [
        "Fire & Natural Disaster Coverage",
        "Theft & Vandalism Protection",
        "Temporary Living Expenses",
        "Personal Liability Coverage",
        "24/7 Emergency Assistance"
      ]
    },
    {
      id: 'plan-travel',
      icon: <Globe />,
      title: "Travel Guard",
      description: "Worry-free international travel with global medical support, trip cancellation, and baggage loss protection.",
      image: "https://picsum.photos/seed/travel-insurance/800/600",
      premium: "$25.00 / trip",
      coverage: "Up to $100,000",
      features: [
        "Emergency Medical Expenses",
        "Trip Cancellation & Interruption",
        "Lost or Delayed Baggage",
        "24/7 Global Concierge",
        "Flight Delay Compensation"
      ]
    },
    {
      id: 'plan-health',
      icon: <Heart />,
      title: "Health Elite",
      description: "Comprehensive health coverage for you and your family with access to top-tier medical facilities worldwide.",
      image: "https://picsum.photos/seed/health-insurance/800/600",
      premium: "$120.00 / mo",
      coverage: "Unlimited",
      features: [
        "Inpatient & Outpatient Care",
        "Maternity & Newborn Coverage",
        "Dental & Vision Benefits",
        "Mental Health Support",
        "International Provider Network"
      ]
    }
  ];

  const handleOptIn = () => {
    setOptInStep(2); // Show PIN
    setPin('');
  };

  const verifyPin = () => {
    setOptInStep(3); // Show OTP
    setOtp('');
  };

  const verifyOtp = () => {
    setIsOptingIn(true);
    setTimeout(() => {
      const newPolicy = {
        id: `POL-${Math.floor(Math.random() * 90000 + 10000)}-${selectedPlan.id.split('-')[1].toUpperCase()}`,
        icon: selectedPlan.icon,
        title: selectedPlan.title,
        coverage: selectedPlan.coverage,
        premium: selectedPlan.premium,
        status: "Active",
        beneficiary: "Self",
        startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: selectedPlan.description
      };

      const updatedPolicies = [newPolicy, ...policies];
      setPolicies(updatedPolicies);
      
      // Save to localStorage (strip icons for JSON)
      localStorage.setItem('maybank_policies', JSON.stringify(updatedPolicies.map(p => ({ ...p, icon: p.id }))));

      setIsOptingIn(false);
      setOptInStep(4); // Success
    }, 2000);
  };

  const resetOptIn = () => {
    setSelectedPlan(null);
    setOptInStep(1);
    setIsOptingIn(false);
    setOtp('');
    setPin('');
  };

  return (
    <>
      <AnimatePresence mode="wait">
      {!selectedPlan ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Insurance Policies</h2>
              <button className="no-round bg-slate-900 px-6 py-3 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">
                Explore Plans
              </button>
            </div>

            <div className={`grid gap-4 lg:gap-8 ${policies.length > 3 ? 'grid-cols-2' : 'grid-cols-1'} lg:grid-cols-2`}>
              {policies.map(policy => (
                <PolicyCard 
                  key={policy.id}
                  {...policy}
                  onClick={() => setSelectedPolicy(policy)}
                />
              ))}
            </div>

            <div className="no-round border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-8">Recommended for You</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {availablePlans.map(plan => (
                  <PlanItem 
                    key={plan.id}
                    {...plan}
                    onClick={() => setSelectedPlan(plan)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            <button 
              onClick={resetOptIn}
              className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-all"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Insurance
            </button>

            <div className="bg-white no-round border border-slate-200 overflow-hidden shadow-xl">
              {optInStep === 1 && (
                <>
                  <div className="relative h-64 lg:h-96">
                    <img 
                      src={selectedPlan.image} 
                      alt={selectedPlan.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-12 w-12 bg-primary text-slate-900 flex items-center justify-center no-round">
                          {selectedPlan.icon}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black text-white">{selectedPlan.title}</h3>
                      </div>
                      <p className="text-slate-200 max-w-2xl">{selectedPlan.description}</p>
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Plan Features
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedPlan.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 no-round border border-slate-100">
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm font-medium text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-primary/5 border border-primary/20 no-round">
                        <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-widest">Why Choose This Plan?</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Our {selectedPlan.title} is designed with your peace of mind as the top priority. 
                          With comprehensive coverage and 24/7 support, you can rest assured that you're protected 
                          against life's uncertainties. Join thousands of satisfied customers who trust May Bank 
                          for their protection needs.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-slate-900 text-white no-round">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                        <p className="text-4xl font-black text-primary">{selectedPlan.premium}</p>
                        <p className="text-xs text-slate-400 mt-4">Coverage up to {selectedPlan.coverage}</p>
                        
                        <button 
                          onClick={handleOptIn}
                          className="w-full mt-8 bg-primary py-4 px-6 text-slate-900 font-bold no-round hover:bg-white transition-all flex items-center justify-center gap-2"
                        >
                          Opt In Now
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="p-6 border border-slate-100 no-round">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Need Help?</h4>
                        <p className="text-xs text-slate-500 mb-4">Talk to our insurance experts for a personalized consultation.</p>
                        <button className="w-full py-3 border border-slate-200 text-sm font-bold hover:bg-slate-50 transition-all no-round">
                          Contact Advisor
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {optInStep === 2 && (
                <div className="p-8 lg:p-12 text-center max-w-md mx-auto">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Transaction PIN</h3>
                  <p className="text-sm text-slate-500 mb-8">Enter your 4-digit transaction PIN to authorize this enrollment.</p>
                  
                  <div className="space-y-6">
                    <OTPInput length={4} value={pin} onChange={setPin} />
                    
                    <button 
                      onClick={verifyPin}
                      disabled={pin.length < 4}
                      className="w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Verify PIN
                    </button>
                  </div>
                </div>
              )}

              {optInStep === 3 && (
                <div className="p-8 lg:p-12 text-center max-w-md mx-auto">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Verification Required</h3>
                  <p className="text-sm text-slate-500 mb-8">We've sent a 6-digit OTP to your registered mobile number to confirm your enrollment in {selectedPlan.title}.</p>
                  
                  <div className="space-y-6">
                    <OTPInput value={otp} onChange={setOtp} />
                    
                    <button 
                      onClick={verifyOtp}
                      disabled={isOptingIn || otp.length < 6}
                      className="w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isOptingIn ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Confirm Enrollment"
                      )}
                    </button>
                    
                    <button className="text-xs font-bold text-slate-400 hover:text-primary uppercase tracking-widest">
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {optInStep === 4 && (
                <div className="p-8 lg:p-12 text-center max-w-md mx-auto">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-100 text-green-600 no-round">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Welcome Aboard!</h3>
                  <p className="text-slate-600 mb-8">Your enrollment in <span className="font-bold text-slate-900">{selectedPlan.title}</span> is complete. Your policy is now active and listed in your dashboard.</p>
                  
                  <button 
                    onClick={resetOptIn}
                    className="w-full bg-primary py-4 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all no-round"
                  >
                    View My Policies
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Policy Detail Modal */}
      <AnimatePresence>
        {selectedPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPolicy(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white p-8 no-round shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 bg-slate-900 text-primary flex items-center justify-center no-round">
                  {selectedPolicy.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedPolicy.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy ID: {selectedPolicy.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Coverage</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{selectedPolicy.coverage}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Premium</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{selectedPolicy.premium}</p>
                </div>
              </div>

              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <FileText className="h-5 w-5 text-primary" />
                  Policy Details
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedPolicy.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 no-round">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Beneficiary</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{selectedPolicy.beneficiary}</p>
                  </div>
                  <div className="p-4 bg-slate-50 no-round">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{selectedPolicy.startDate}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button className="flex-1 no-round bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">
                  Download Policy
                </button>
                <button className="flex-1 no-round border border-red-200 text-red-500 py-4 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Opt Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function PolicyCard({ icon, title, id, coverage, premium, status, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="no-round border border-slate-200 bg-white p-6 lg:p-8 hover:border-primary transition-all group cursor-pointer shadow-sm relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 h-full w-1 bg-primary transform translate-x-full group-hover:translate-x-0 transition-transform" />
      
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div className="h-12 w-12 lg:h-14 lg:w-14 bg-slate-900 text-primary flex items-center justify-center no-round group-hover:bg-primary group-hover:text-slate-900 transition-all">
          {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 lg:h-7 lg:w-7" })}
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-1 lg:px-3 lg:py-1 no-round">
          <CheckCircle2 className="h-3 w-3 lg:h-4 lg:w-4" />
          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest">{status}</span>
        </div>
      </div>
      
      <h3 className="text-lg lg:text-xl font-bold text-slate-900 group-hover:text-primary transition-all">{title}</h3>
      <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {id}</p>
      
      <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-slate-100">
        <div>
          <p className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coverage</p>
          <p className="text-sm lg:text-lg font-black text-slate-900">{coverage}</p>
        </div>
        <div>
          <p className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium</p>
          <p className="text-sm lg:text-lg font-black text-slate-900">{premium}</p>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between lg:hidden">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">View Policy</span>
        <ArrowRight className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}

function PlanItem({ icon, title, description, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="space-y-4 p-6 border border-slate-100 hover:border-primary transition-all group cursor-pointer bg-slate-50/50 hover:bg-white hover:shadow-md no-round"
    >
      <div className="h-12 w-12 bg-white flex items-center justify-center no-round shadow-sm text-slate-900 group-hover:bg-primary transition-all">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
      </div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{description}</p>
      <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
        View Details
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
