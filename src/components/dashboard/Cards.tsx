import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { CreditCard, Plus, Shield, Lock, Settings, Eye, EyeOff, X, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import Logo from '../Logo';
import { motion, AnimatePresence } from 'motion/react';
import OTPInput from '../ui/OTPInput';

export default function Cards() {
  const [showNumber, setShowNumber] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isFrozen, setIsFrozen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingToggle, setPendingToggle] = useState<any>(null);

  const [applyStep, setApplyStep] = useState(1); // 1: Select, 2: Processing, 3: Success
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);

  const handleResetPin = () => {
    setActiveModal('reset-pin-otp');
  };

  const verifyResetPinOtp = () => {
    setOtpSent(true);
    setTimeout(() => {
      setActiveModal('pin-success');
      setOtpSent(false);
    }, 3000);
  };

  const handleApply = () => {
    setApplyStep(2);
    setTimeout(() => {
      setApplyStep(3);
    }, 8000);
  };

  const handleToggleRequest = (cardType: string) => {
    if (isAuthorized) {
      setShowNumber(!showNumber);
    } else {
      setPendingToggle(cardType);
      setActiveModal('password-check');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password') { // Simulated password
      setIsAuthorized(true);
      setActiveModal(null);
      setShowNumber(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid password. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">My Cards</h2>
          <button 
            onClick={() => setActiveModal('apply')}
            className="no-round bg-slate-900 px-4 lg:px-6 py-2 lg:py-3 text-[10px] lg:text-sm font-bold text-white hover:bg-primary hover:text-slate-900 transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
            Apply
          </button>
        </div>

        <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2">
          <BankCard 
            type="Platinum Debit" 
            number={showNumber && isAuthorized ? "4290 8812 5521 0098" : "•••• •••• •••• 4290"} 
            expiry="12/28" 
            holder="JOHN DOE"
            color="bg-slate-900"
            showNumber={showNumber && isAuthorized}
            onToggle={() => handleToggleRequest('platinum')}
            isFrozen={isFrozen}
          />
          <BankCard 
            type="Infinite Credit" 
            number={showNumber && isAuthorized ? "5512 9901 2231 4456" : "•••• •••• •••• 8812"} 
            expiry="05/26" 
            holder="JOHN DOE"
            color="bg-primary"
            light
            showNumber={showNumber && isAuthorized}
            onToggle={() => handleToggleRequest('infinite')}
          />
        </div>

        <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
          <CardAction 
            icon={<Lock className="h-5 w-5 lg:h-6 lg:w-6" />} 
            title={isFrozen ? "Unfreeze" : "Freeze"} 
            description="Toggle card status" 
            onClick={() => setIsFrozen(!isFrozen)}
          />
          <CardAction 
            icon={<Shield className="h-5 w-5 lg:h-6 lg:w-6" />} 
            title="Security" 
            description="Manage permissions" 
            onClick={() => setActiveModal('security')}
          />
          <CardAction 
            icon={<Settings className="h-5 w-5 lg:h-6 lg:w-6" />} 
            title="Reset PIN" 
            description="Change card PIN" 
            onClick={() => setActiveModal('reset-pin')}
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              {activeModal === 'password-check' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <Lock className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Security Check</h3>
                    <p className="text-sm text-slate-500 mt-2">Please enter your password to view card details.</p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-slate-200 py-3 px-4 no-round font-bold outline-none focus:border-primary"
                        placeholder="••••••••"
                        autoFocus
                      />
                      {passwordError && <p className="text-xs text-red-500 mt-2 font-bold">{passwordError}</p>}
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all no-round"
                    >
                      Verify Password
                    </button>
                  </form>
                </div>
              )}

              {activeModal === 'reset-pin' && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-primary/10 text-primary no-round">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Reset Card PIN</h3>
                  <p className="mt-4 text-slate-600">For security, we will send a one-time password (OTP) to your registered email address.</p>
                  <button 
                    onClick={handleResetPin}
                    className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all"
                  >
                    Send OTP to Email
                  </button>
                </div>
              )}

              {activeModal === 'reset-pin-otp' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Verify OTP</h3>
                    <p className="text-sm text-slate-500 mt-2">Enter the 6-digit code sent to your email.</p>
                  </div>
                  <div className="space-y-6">
                    <OTPInput value={otp} onChange={setOtp} />
                    <button 
                      onClick={verifyResetPinOtp}
                      disabled={otp.length < 6}
                      className="no-round w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                    >
                      Verify & Reset
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'pin-success' && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-green-100 text-green-600 no-round">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">OTP Sent Successfully</h3>
                  <p className="mt-4 text-slate-600">Please check your email for the 6-digit code to reset your card PIN.</p>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="no-round mt-8 w-full bg-primary py-4 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Close
                  </button>
                </div>
              )}

              {activeModal === 'security' && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <SecurityToggle label="Online Transactions" defaultChecked />
                    <SecurityToggle label="International Usage" />
                    <SecurityToggle label="Contactless Payments" defaultChecked />
                    <SecurityToggle label="ATM Withdrawals" defaultChecked />
                  </div>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all"
                  >
                    Save Settings
                  </button>
                </div>
              )}

              {activeModal === 'apply' && (
                <div>
                  {applyStep === 1 && (
                    <>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Apply for New Card</h3>
                      <div className="space-y-4">
                        <div 
                          onClick={() => setSelectedCardType('infinite')}
                          className={`p-4 border-2 no-round cursor-pointer transition-all ${selectedCardType === 'infinite' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-slate-900">Infinite Credit Card</p>
                            {selectedCardType === 'infinite' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-slate-500">Premium benefits & 2% cashback</p>
                        </div>
                        <div 
                          onClick={() => setSelectedCardType('platinum')}
                          className={`p-4 border-2 no-round cursor-pointer transition-all ${selectedCardType === 'platinum' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-slate-900">Platinum Debit Card</p>
                            {selectedCardType === 'platinum' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-slate-500">Zero annual fees & global access</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleApply}
                        disabled={!selectedCardType}
                        className="no-round mt-8 w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                      >
                        Continue Application
                      </button>
                    </>
                  )}

                  {applyStep === 2 && (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-slate-900">Processing Application</h3>
                      <p className="text-sm text-slate-500 mt-2">We are reviewing your eligibility for the {selectedCardType === 'infinite' ? 'Infinite Credit' : 'Platinum Debit'} card...</p>
                    </div>
                  )}

                  {applyStep === 3 && (
                    <div className="text-center">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-100 text-green-600 no-round">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Application Successful</h3>
                      <p className="mt-4 text-slate-600">Your new card has been approved and will be delivered to your registered address within 3-5 business days.</p>
                      <button 
                        onClick={() => setActiveModal(null)}
                        className="no-round mt-8 w-full bg-primary py-4 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function BankCard({ type, number, expiry, holder, color, light = false, showNumber, onToggle, isFrozen }: any) {
  return (
    <div className={`relative h-48 lg:h-64 w-full overflow-hidden no-round ${color} p-4 lg:p-8 ${light ? 'text-slate-900' : 'text-white'} shadow-2xl group transition-all ${isFrozen ? 'grayscale opacity-60' : ''}`}>
      <div className={`absolute -right-10 -top-10 h-32 lg:h-48 w-32 lg:w-48 rounded-full ${light ? 'bg-white/20' : 'bg-primary/10'} blur-3xl`} />
      
      {isFrozen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-white px-3 py-1 lg:px-4 lg:py-2 no-round flex items-center gap-2 shadow-xl">
            <Lock className="h-3 w-3 lg:h-4 lg:w-4 text-red-500" />
            <span className="text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-widest">Frozen</span>
          </div>
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">{type}</p>
            <Logo light={!light} className="mt-1 lg:mt-2 scale-75 lg:scale-90 origin-left" />
          </div>
          <div className="h-8 w-12 lg:h-12 lg:w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md opacity-80" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg lg:text-2xl font-bold tracking-[0.2em] lg:tracking-[0.3em]">{number}</div>
          {onToggle && (
            <button onClick={onToggle} className="p-1 lg:p-2 hover:bg-white/10 rounded-full transition-all">
              {showNumber ? <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" /> : <Eye className="h-4 w-4 lg:h-5 lg:w-5" />}
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] lg:text-[10px] uppercase opacity-60">Card Holder</p>
            <p className="text-sm lg:text-lg font-bold">{holder}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] lg:text-[10px] uppercase opacity-60">Expires</p>
            <p className="text-sm lg:text-lg font-bold">{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAction({ icon, title, description, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="no-round border border-slate-200 bg-white p-4 lg:p-6 text-left hover:border-primary transition-all group"
    >
      <div className="h-10 w-10 lg:h-12 lg:w-12 bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-primary transition-all mb-3 lg:mb-4">
        {icon}
      </div>
      <h4 className="text-sm lg:text-base font-bold text-slate-900">{title}</h4>
      <p className="text-[10px] lg:text-sm text-slate-500 mt-1">{description}</p>
    </button>
  );
}

function SecurityToggle({ label, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold text-slate-700">{label}</span>
      <button 
        onClick={() => setChecked(!checked)}
        className={`h-6 w-12 no-round transition-all relative ${checked ? 'bg-primary' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 h-4 w-4 bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}
