import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { User, Lock, Bell, Shield, Globe, CreditCard, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { handleNumberInput, handleLetterInput } from '../../lib/utils';
import OTPInput from '../ui/OTPInput';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [otpPurpose, setOtpPurpose] = useState<'profile' | 'password'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [phone, setPhone] = useState('66812345678');
  const [otp, setOtp] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpPurpose('profile');
    setShowOtpModal(true);
    setOtpStep(1);
    setOtp('');
  };

  const handleChangePassword = () => {
    setOtpPurpose('password');
    setShowOtpModal(true);
    setOtpStep(1);
    setOtp('');
  };

  const verifyOtp = () => {
    setOtpStep(2); // Processing
    setTimeout(() => {
      setOtpStep(3); // Success
      setTimeout(() => {
        setShowOtpModal(false);
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <SettingsNavLink 
              icon={<User />} 
              label="Profile Information" 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
            />
            <SettingsNavLink 
              icon={<Lock />} 
              label="Password & Security" 
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
            />
            <SettingsNavLink 
              icon={<Bell />} 
              label="Notifications" 
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')}
            />
            <SettingsNavLink 
              icon={<Shield />} 
              label="Privacy Settings" 
              active={activeTab === 'privacy'} 
              onClick={() => setActiveTab('privacy')}
            />
            <SettingsNavLink 
              icon={<Globe />} 
              label="Language & Region" 
              active={activeTab === 'language'} 
              onClick={() => setActiveTab('language')}
            />
            <SettingsNavLink 
              icon={<CreditCard />} 
              label="Payment Methods" 
              active={activeTab === 'payments'} 
              onClick={() => setActiveTab('payments')}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-2 no-round border border-slate-200 bg-white p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-8">Profile Information</h3>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
                        <input 
                          type="text" 
                          value={firstName} 
                          onChange={(e) => handleLetterInput(e, setFirstName)}
                          className="no-round w-full border border-slate-200 bg-slate-50 py-3 px-4 font-bold text-slate-900 outline-none focus:border-primary" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
                        <input 
                          type="text" 
                          value={lastName} 
                          onChange={(e) => handleLetterInput(e, setLastName)}
                          className="no-round w-full border border-slate-200 bg-slate-50 py-3 px-4 font-bold text-slate-900 outline-none focus:border-primary" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" className="no-round w-full border border-slate-200 bg-slate-50 py-3 px-4 font-bold text-slate-900 outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => handleNumberInput(e, setPhone)}
                        className="no-round w-full border border-slate-200 bg-slate-50 py-3 px-4 font-bold text-slate-900 outline-none focus:border-primary" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bio</label>
                      <textarea rows={4} className="no-round w-full border border-slate-200 bg-slate-50 py-3 px-4 font-bold text-slate-900 outline-none focus:border-primary resize-none" defaultValue="Digital banking enthusiast and long-term investor." />
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                      <button type="button" className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-all">Cancel</button>
                      <button type="submit" className="no-round bg-slate-900 px-8 py-3 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">Save Changes</button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-8">Password & Security</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 border border-slate-100 no-round flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                      </div>
                      <div className="h-6 w-12 bg-primary no-round relative cursor-pointer">
                        <div className="absolute right-1 top-1 h-4 w-4 bg-slate-900" />
                      </div>
                    </div>
                    <button 
                      onClick={handleChangePassword}
                      className="no-round border border-slate-200 px-6 py-3 font-bold text-slate-900 hover:border-primary transition-all"
                    >
                      Change Password
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-8">Notifications</h3>
                  <div className="space-y-4">
                    <NotificationToggle label="Email Notifications" active />
                    <NotificationToggle label="Push Notifications" active />
                    <NotificationToggle label="SMS Alerts" />
                  </div>
                </motion.div>
              )}
              
              {/* Other tabs can be added similarly */}
              {['privacy', 'language', 'payments'].includes(activeTab) && (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">Coming Soon</p>
                  <p className="text-sm text-slate-500 mt-2">This settings module is currently under development.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOtpModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 no-round shadow-2xl"
            >
              <button 
                onClick={() => setShowOtpModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>

              {otpStep === 1 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-900 no-round">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Confirm {otpPurpose === 'profile' ? 'Changes' : 'Password Reset'}</h3>
                    <p className="text-sm text-slate-500 mt-2">Please enter the 6-digit OTP sent to your email to {otpPurpose === 'profile' ? 'save these profile changes' : 'authorize your password change'}.</p>
                  </div>
                  <div className="space-y-6">
                    <OTPInput value={otp} onChange={setOtp} />
                    <button 
                      onClick={verifyOtp}
                      disabled={otp.length < 6}
                      className="no-round w-full bg-slate-900 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50"
                    >
                      Verify & {otpPurpose === 'profile' ? 'Save' : 'Confirm'}
                    </button>
                  </div>
                </div>
              )}

              {otpStep === 2 && (
                <div className="text-center py-8">
                  <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-slate-900">{otpPurpose === 'profile' ? 'Saving Changes' : 'Updating Password'}</h3>
                </div>
              )}

              {otpStep === 3 && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-green-100 text-green-600 no-round">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{otpPurpose === 'profile' ? 'Changes Saved' : 'Password Updated'}</h3>
                  <p className="mt-2 text-slate-500">{otpPurpose === 'profile' ? 'Your profile has been updated successfully.' : 'Your password has been changed successfully.'}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function SettingsNavLink({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-6 py-4 text-sm font-bold transition-all no-round border-l-4 ${active ? 'bg-slate-50 border-primary text-slate-900' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
      <span className="h-5 w-5">{icon}</span>
      {label}
    </button>
  );
}

function NotificationToggle({ label, active = false }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 no-round">
      <span className="text-sm font-bold text-slate-900">{label}</span>
      <div className={`h-6 w-12 no-round relative cursor-pointer transition-all ${active ? 'bg-primary' : 'bg-slate-200'}`}>
        <div className={`absolute top-1 h-4 w-4 bg-slate-900 transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}
