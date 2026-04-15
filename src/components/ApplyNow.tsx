import { motion } from 'motion/react';
import { UserPlus, FileText, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ApplyNow() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2000" 
            alt="Apply Hero"
            className="h-full w-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-white md:text-7xl"
          >
            Start Your <span className="text-primary">Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto px-6"
          >
            Open an account in minutes and experience the future of banking.
          </motion.p>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Choose Your Account</h2>
            <p className="mt-4 text-slate-500">Select the account that best fits your lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AccountCard 
              title="Savings Account" 
              price="Free" 
              features={["4% Interest Rate", "Zero Monthly Fees", "Free Debit Card", "Mobile Banking"]} 
            />
            <AccountCard 
              title="Current Account" 
              price="$5/mo" 
              features={["Unlimited Transactions", "Overdraft Facility", "Business Support", "Priority Service"]} 
              active
            />
            <AccountCard 
              title="Premium Account" 
              price="$15/mo" 
              features={["Personal Manager", "Global Lounge Access", "Travel Insurance", "Concierge Service"]} 
            />
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white no-round shadow-2xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-10">Application Form</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="First Name" placeholder="John" />
                <FormInput label="Last Name" placeholder="Doe" />
              </div>
              <FormInput label="Email Address" placeholder="john@example.com" type="email" />
              <FormInput label="Phone Number" placeholder="+1 (555) 000-0000" />
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Account Type</label>
                <select className="no-round w-full px-6 py-4 bg-slate-50 border border-slate-100 outline-none font-bold text-slate-900 appearance-none">
                  <option>Savings Account</option>
                  <option>Current Account</option>
                  <option>Premium Account</option>
                </select>
              </div>
              <button className="no-round w-full bg-slate-900 text-white py-5 font-black text-lg hover:bg-primary hover:text-slate-900 transition-all uppercase tracking-widest">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900">What You'll Need</h2>
              <p className="mt-6 text-slate-600">Keep these documents ready for a smooth application process.</p>
              <div className="mt-10 space-y-6">
                <DocItem icon={<UserPlus />} title="Proof of Identity" description="Passport, Driver's License, or National ID." />
                <DocItem icon={<FileText />} title="Proof of Address" description="Utility bill or bank statement (last 3 months)." />
                <DocItem icon={<ShieldCheck />} title="Tax Identification" description="Your local tax ID or Social Security Number." />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-primary p-12 no-round">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Security Guarantee</h3>
                <p className="text-slate-800 leading-relaxed">
                  Your data is encrypted using military-grade 256-bit encryption. We never share your personal information with third parties without your explicit consent.
                </p>
                <div className="mt-8 flex items-center gap-4 text-slate-900 font-bold">
                  <CheckCircle className="h-6 w-6" />
                  GDPR Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AccountCard({ title, price, features, active }: any) {
  return (
    <div className={`no-round p-12 border transition-all ${active ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-2xl z-10' : 'bg-white text-slate-900 border-slate-100 hover:border-primary'}`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-black">{price}</span>
      </div>
      <ul className="mt-10 space-y-4">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm font-medium">
            <CheckCircle className={`h-4 w-4 ${active ? 'text-primary' : 'text-primary'}`} />
            {f}
          </li>
        ))}
      </ul>
      <button className={`no-round mt-12 w-full py-4 font-bold transition-all ${active ? 'bg-primary text-slate-900 hover:bg-white' : 'bg-slate-100 text-slate-900 hover:bg-primary'}`}>
        Select Plan
      </button>
    </div>
  );
}

function FormInput({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="no-round w-full px-6 py-4 bg-slate-50 border border-slate-100 outline-none font-bold text-slate-900 focus:border-primary transition-all"
      />
    </div>
  );
}

function DocItem({ icon, title, description }: any) {
  return (
    <div className="flex gap-6">
      <div className="h-12 w-12 flex-shrink-0 bg-slate-100 flex items-center justify-center text-slate-900">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}
