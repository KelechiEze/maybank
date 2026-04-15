import { useState, ReactNode } from 'react';
import { Home, Car, Briefcase, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EMICalculator() {
  const [loanType, setLoanType] = useState<'home' | 'business' | 'car'>('home');
  const [amount, setAmount] = useState(2000000);
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(12);

  const loanInfo = {
    home: {
      title: "Home Loan",
      description: "Build your dream home with our flexible mortgage solutions. We offer competitive rates and long repayment terms.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
    },
    business: {
      title: "Business Loan",
      description: "Fuel your business growth with our customized commercial lending. Whether it's expansion or working capital.",
      image: "https://images.unsplash.com/photo-1454165833762-016540f26b6e?auto=format&fit=crop&q=80&w=800"
    },
    car: {
      title: "Car Loan",
      description: "Drive your dream car today. Our auto loans come with quick processing and attractive interest rates.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    }
  };

  const monthlyRate = rate / 12 / 100;
  const months = term * 12;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
  const totalPayable = emi * months;
  const totalInterest = totalPayable - amount;

  return (
    <section className="bg-[#FDFBF7] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 md:text-6xl">Flexible EMI Calculator Online</h2>
          <motion.p 
            key={loanType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-slate-500 max-w-2xl mx-auto"
          >
            {loanInfo[loanType].description}
          </motion.p>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:flex-row">
          {/* Left Side - Image & Icons */}
          <div className="relative flex lg:w-1/3">
            <AnimatePresence mode="wait">
              <motion.img 
                key={loanType}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={loanInfo[loanType].image} 
                alt={loanInfo[loanType].title}
                className="no-round h-[500px] w-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute top-1/2 -right-8 flex -translate-y-1/2 flex-col gap-4">
              <button onClick={() => setLoanType('home')}><CalculatorIcon icon={<Home className="h-6 w-6" />} active={loanType === 'home'} /></button>
              <button onClick={() => setLoanType('business')}><CalculatorIcon icon={<Briefcase className="h-6 w-6" />} active={loanType === 'business'} /></button>
              <button onClick={() => setLoanType('car')}><CalculatorIcon icon={<Car className="h-6 w-6" />} active={loanType === 'car'} /></button>
            </div>
          </div>

          {/* Right Side - Sliders */}
          <div className="flex flex-col justify-center lg:w-2/3 lg:pl-12">
            <div className="space-y-10">
              <SliderInput 
                label={`${loanInfo[loanType].title} Amount`} 
                value={amount} 
                min={100000} 
                max={10000000} 
                onChange={setAmount}
                format={(v: number) => `$${v.toLocaleString()}`}
                subLabel="$100k - $10M"
              />
              <SliderInput 
                label="Loan Term (Years)" 
                value={term} 
                min={1} 
                max={30} 
                onChange={setTerm}
                format={(v: number) => `${v}Yrs`}
                subLabel="1 - 30"
              />
              <SliderInput 
                label="Interest Rate" 
                value={rate} 
                min={1} 
                max={20} 
                onChange={setRate}
                format={(v: number) => `${v}%`}
                subLabel="1 - 20"
              />
            </div>

            {/* Result Box */}
            <div className="mt-12 border border-slate-100 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Your Monthly EMI</p>
                    <p className="text-3xl font-black text-slate-900">${emi.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6 md:flex-row md:gap-12">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="text-primary">→</span> Interest Amount
                    </p>
                    <p className="mt-1 text-slate-500">${totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="text-primary">→</span> Total Amount Payable
                    </p>
                    <p className="mt-1 text-slate-500">${totalPayable.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <button className="no-round mt-8 w-full bg-slate-100 py-4 font-bold text-slate-900 transition-all hover:bg-primary">
                Open an Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorIcon({ icon, active }: { icon: ReactNode; active?: boolean }) {
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all ${active ? 'bg-primary text-slate-900' : 'bg-white text-slate-400 hover:text-primary'}`}>
      {icon}
    </div>
  );
}

function SliderInput({ label, value, min, max, onChange, format, subLabel }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-lg font-bold text-slate-900">{label}</label>
        <div className="no-round border border-slate-200 bg-white px-4 py-2 font-bold">
          {format(value)}
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none bg-slate-200 accent-primary"
      />
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{subLabel}</p>
    </div>
  );
}
