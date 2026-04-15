import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  Upload, 
  MapPin, 
  CreditCard,
  Calendar,
  Globe,
  UserCircle
} from 'lucide-react';
import Logo from './Logo';
import { handleNumberInput, handleLetterInput, allowOnlyNumbers, allowOnlyLetters } from '../lib/utils';
import OTPInput from './ui/OTPInput';

const carouselImages = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
];

export default function Signup() {
  const [currentImage, setCurrentImage] = useState(0);
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    otp: '',
    fullName: '',
    dob: '',
    nationality: 'Thailand',
    gender: '',
    idType: 'Thai National ID',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
    pin: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFiles(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step === 4) {
      setIsVerifying(true);
      // Simulate sensitive verification
      setTimeout(() => {
        setIsVerifying(false);
        setStep(5);
      }, 3000);
    } else if (step < 8) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Image Carousel */}
      <div className="relative hidden w-1/3 lg:block overflow-hidden border-r border-slate-100">
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
            <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link to="/">
            <Logo light />
          </Link>
          
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white leading-tight">
                Secure <br />
                <span className="text-primary">Digital Banking</span> <br />
                in Thailand
              </h2>
              <div className="space-y-4">
                <StepIndicator currentStep={step} stepNumber={1} label="Registration" />
                <StepIndicator currentStep={step} stepNumber={2} label="Verification" />
                <StepIndicator currentStep={step} stepNumber={3} label="Personal Info" />
                <StepIndicator currentStep={step} stepNumber={4} label="e-KYC" />
                <StepIndicator currentStep={step} stepNumber={5} label="Address" />
                <StepIndicator currentStep={step} stepNumber={6} label="Security" />
              </div>
            </motion.div>
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
      <div className="flex w-full flex-col justify-center px-8 lg:w-2/3 lg:px-24 py-12">
        <div className="mx-auto w-full max-w-2xl">
          {step < 7 && (
            <button onClick={handleBack} className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all">
              <ArrowLeft className="h-4 w-4" />
              {step === 1 ? 'Back to Home' : 'Previous Step'}
            </button>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">Start Registration</h1>
                <p className="mt-2 text-slate-500">Enter your mobile number and email to receive an OTP.</p>
                <form onSubmit={handleNext} className="mt-10 space-y-6">
                  <FormGroup label="Mobile Number" icon={<Phone />} placeholder="66 8X XXX XXXX" value={formData.mobile} onChange={(v) => updateFormData('mobile', v)} validationType="number" />
                  <FormGroup label="Email Address" icon={<Mail />} placeholder="your@email.com" type="email" value={formData.email} onChange={(v) => updateFormData('email', v)} />
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">Send OTP</button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">OTP Verification</h1>
                <p className="mt-2 text-slate-500">We've sent a 6-digit code to <span className="font-bold text-slate-900">{formData.email}</span></p>
                <form onSubmit={handleNext} className="mt-10 space-y-8">
                  <OTPInput value={formData.otp} onChange={(v) => updateFormData('otp', v)} />
                  <div className="text-center">
                    <button type="button" className="text-sm font-bold text-primary hover:underline">Resend OTP in 54s</button>
                  </div>
                  <button 
                    disabled={formData.otp.length < 6}
                    className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 disabled:opacity-50"
                  >
                    Verify OTP
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">Personal Information</h1>
                <p className="mt-2 text-slate-500">Please provide your details as they appear on your ID.</p>
                <form onSubmit={handleNext} className="mt-10 space-y-6">
                  <FormGroup label="Full Name" icon={<User />} placeholder="John Doe" value={formData.fullName} onChange={(v) => updateFormData('fullName', v)} validationType="letter" />
                  <div className="grid grid-cols-2 gap-6">
                    <FormGroup label="Date of Birth" icon={<Calendar />} type="date" value={formData.dob} onChange={(v) => updateFormData('dob', v)} />
                    <FormGroup label="Nationality" icon={<Globe />} value={formData.nationality} onChange={(v) => updateFormData('nationality', v)} validationType="letter" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Gender</label>
                    <div className="flex gap-4">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button key={g} type="button" onClick={() => updateFormData('gender', g)} className={`flex-1 py-4 border font-bold transition-all ${formData.gender === g ? 'bg-primary border-primary text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400'}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">Continue</button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">Identity Verification</h1>
                <p className="mt-2 text-slate-500">Complete e-KYC to secure your account.</p>
                
                {isVerifying ? (
                  <div className="mt-20 flex flex-col items-center justify-center space-y-6">
                    <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-bold text-slate-900">Verifying credentials...</p>
                    <p className="text-slate-500">Please wait while we process your sensitive documents.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNext} className="mt-10 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">ID Type</label>
                        <select className="no-round w-full border border-slate-200 bg-slate-50 py-4 px-4 font-bold text-slate-900 outline-none focus:border-primary" value={formData.idType} onChange={(e) => updateFormData('idType', e.target.value)}>
                          <option>Thai National ID</option>
                          <option>Passport</option>
                        </select>
                      </div>
                      <FormGroup label="ID Number" icon={<ShieldCheck />} placeholder="1 2345 67890 12 3" value={formData.idNumber} onChange={(v) => updateFormData('idNumber', v)} validationType="number" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <UploadBox 
                        icon={<Upload />} 
                        label="Front of ID" 
                        preview={uploadedFiles['idFront']}
                        onChange={(e: any) => handleFileUpload(e, 'idFront')}
                      />
                      <UploadBox 
                        icon={<Upload />} 
                        label="Back of ID" 
                        preview={uploadedFiles['idBack']}
                        onChange={(e: any) => handleFileUpload(e, 'idBack')}
                      />
                    </div>
                    <UploadBox 
                      icon={<Camera />} 
                      label="Take a Selfie" 
                      preview={uploadedFiles['selfie']}
                      onChange={(e: any) => handleFileUpload(e, 'selfie')}
                    />
                    
                    <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">Verify Identity</button>
                  </form>
                )}
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">Address Details</h1>
                <p className="mt-2 text-slate-500">Where should we send your physical card?</p>
                <form onSubmit={handleNext} className="mt-10 space-y-6">
                  <FormGroup label="Residential Address" icon={<MapPin />} placeholder="Street, Building, Unit" value={formData.address} onChange={(v) => updateFormData('address', v)} />
                  <div className="grid grid-cols-2 gap-6">
                    <FormGroup label="City / Province" icon={<MapPin />} placeholder="Bangkok" value={formData.city} onChange={(v) => updateFormData('city', v)} validationType="letter" />
                    <FormGroup label="Postal Code" icon={<MapPin />} placeholder="10XXX" value={formData.postalCode} onChange={(v) => updateFormData('postalCode', v)} validationType="number" />
                  </div>
                  <FormGroup label="Country" icon={<Globe />} value="Thailand" disabled />
                  <button className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">Continue</button>
                </form>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-bold text-slate-900">Security Setup</h1>
                <p className="mt-2 text-slate-500">Protect your account with a password and PIN.</p>
                <form onSubmit={handleNext} className="mt-10 space-y-6">
                  <FormGroup label="Create Password" icon={<Lock />} type="password" placeholder="••••••••" value={formData.password} onChange={(v) => updateFormData('password', v)} />
                  <FormGroup label="Confirm Password" icon={<Lock />} type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(v) => updateFormData('confirmPassword', v)} />
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">6-Digit Transaction PIN</label>
                    <OTPInput value={formData.pin} onChange={(v) => updateFormData('pin', v)} />
                  </div>
                  <button 
                    disabled={formData.password !== formData.confirmPassword || formData.pin.length < 6}
                    className="no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 disabled:opacity-50"
                  >
                    Complete Setup
                  </button>
                </form>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="step7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="mx-auto h-24 w-24 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-8">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-black text-slate-900">Account Created!</h1>
                <p className="mt-4 text-lg text-slate-500">Your May Bank account has been successfully generated.</p>
                <div className="mt-12 p-8 bg-slate-50 border border-slate-100 no-round text-left space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Name</p>
                    <p className="text-xl font-bold text-slate-900">{formData.fullName.toUpperCase() || 'JOHN DOE'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Number</p>
                    <p className="text-xl font-bold text-slate-900 tracking-widest">098-2-45129-0</p>
                  </div>
                </div>
                <button onClick={handleNext} className="mt-12 no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900">Continue to Welcome</button>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div key="step8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12">
                <div className="flex items-center justify-between mb-12">
                  <Logo />
                  <div className="h-12 w-12 bg-primary flex items-center justify-center font-bold text-slate-900">JD</div>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900">Welcome to May Bank</h1>
                <p className="mt-2 text-slate-500">Your digital financial journey starts here.</p>

                <div className="mt-12 grid gap-6">
                  <div className="no-round bg-slate-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 blur-3xl" />
                    <div className="relative z-10">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Total Balance</p>
                      <h2 className="text-5xl font-black mt-2 text-primary">฿0.00</h2>
                      <div className="mt-8 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase opacity-60">Account Number</p>
                          <p className="font-bold tracking-widest">098-2-45129-0</p>
                        </div>
                        <CreditCard className="h-8 w-8 opacity-20" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <WelcomeAction icon={<ArrowRight />} label="Add Funds" />
                    <WelcomeAction icon={<ArrowRight />} label="Explore Features" />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('trigger-preloader'));
                    setTimeout(() => {
                      navigate('/dashboard');
                    }, 3500);
                  }} 
                  className="mt-12 no-round w-full bg-slate-900 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-slate-900 flex items-center justify-center gap-3"
                >
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ currentStep, stepNumber, label }: any) {
  const isActive = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;
  
  return (
    <div className="flex items-center gap-4">
      <div className={`h-8 w-8 flex items-center justify-center font-bold text-xs transition-all ${isActive ? 'bg-primary text-slate-900 scale-110' : isCompleted ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}>
        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : stepNumber}
      </div>
      <span className={`text-sm font-bold uppercase tracking-widest transition-all ${isActive ? 'text-white' : 'text-white/30'}`}>{label}</span>
    </div>
  );
}

function FormGroup({ label, icon, placeholder, type = "text", value, onChange, disabled = false, validationType }: any) {
  const handleChange = (val: string) => {
    let newVal = val;
    if (validationType === 'number') {
      newVal = allowOnlyNumbers(val);
    } else if (validationType === 'letter') {
      newVal = allowOnlyLetters(val);
    }
    onChange?.(newVal);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input 
          disabled={disabled}
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="no-round w-full border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-bold text-slate-900 outline-none focus:border-primary transition-all disabled:opacity-50"
        />
      </div>
    </div>
  );
}

function UploadBox({ icon, label, preview, onChange }: any) {
  return (
    <div className="group cursor-pointer space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
      <label className="relative no-round border-2 border-dashed border-slate-200 bg-slate-50 p-8 flex flex-col items-center justify-center gap-2 group-hover:border-primary transition-all cursor-pointer overflow-hidden min-h-[140px]">
        {preview ? (
          <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <div className="text-slate-400 group-hover:text-primary transition-all">{icon}</div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900">Click to Upload</span>
          </>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
      </label>
    </div>
  );
}

function WelcomeAction({ icon, label }: any) {
  return (
    <button className="no-round border border-slate-100 bg-slate-50 p-6 flex flex-col items-center gap-3 hover:border-primary transition-all group">
      <div className="h-10 w-10 bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-all">{icon}</div>
      <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{label}</span>
    </button>
  );
}
