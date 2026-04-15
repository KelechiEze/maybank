import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, HelpCircle, Building2, Gift, MapPin, Search, ArrowRight } from 'lucide-react';

function PageHeader({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900 py-20 lg:py-32 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-primary/10 blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="h-16 w-16 bg-primary text-slate-900 flex items-center justify-center no-round mb-8">
            {icon}
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6">{title}</h1>
          <p className="text-xl text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function Careers() {
  return (
    <div>
      <PageHeader 
        title="Join Our Team" 
        description="Build the future of digital banking with us. We're looking for passionate innovators to redefine the financial landscape."
        icon={<Briefcase className="h-8 w-8" />}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">Open Positions</h2>
            {[
              { title: "Senior Frontend Engineer", dept: "Engineering", type: "Remote / Bangkok" },
              { title: "Product Designer", dept: "Design", type: "Bangkok" },
              { title: "Financial Analyst", dept: "Finance", type: "Kuala Lumpur" },
              { title: "Customer Success Manager", dept: "Operations", type: "Remote" }
            ].map((job, i) => (
              <div key={i} className="p-8 border border-slate-100 hover:border-primary transition-all no-round group cursor-pointer flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-all">{job.title}</h3>
                  <p className="text-slate-500 mt-1">{job.dept} • {job.type}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-primary transition-all" />
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 no-round">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Our Culture</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe in radical transparency, extreme ownership, and continuous learning. 
                At May Bank, you'll have the autonomy to make a real impact from day one.
              </p>
            </div>
            <div className="p-8 bg-primary/10 no-round border border-primary/20">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Benefits</h3>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li>• Competitive Salary & Equity</li>
                <li>• Flexible Work Arrangements</li>
                <li>• Health & Wellness Allowance</li>
                <li>• Professional Development Budget</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQs() {
  return (
    <div>
      <PageHeader 
        title="How can we help?" 
        description="Find answers to common questions about our services, security, and account management."
        icon={<HelpCircle className="h-8 w-8" />}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full border border-slate-200 py-4 pl-12 pr-4 no-round font-bold outline-none focus:border-primary"
            />
          </div>
          {[
            { q: "How do I open a new account?", a: "You can open an account in minutes through our mobile app or website. Just have your ID ready and follow the simple steps." },
            { q: "Is my data secure with May Bank?", a: "We use military-grade encryption and multi-factor authentication to ensure your data and funds are always protected." },
            { q: "What are the international transfer fees?", a: "We offer some of the most competitive rates in the market. Fees vary by destination and amount, usually starting from 0.5%." },
            { q: "How can I reset my transaction PIN?", a: "You can reset your PIN through the 'Cards' section in your dashboard. A verification code will be sent to your email." }
          ].map((faq, i) => (
            <div key={i} className="p-8 border border-slate-100 no-round">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{faq.q}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Business() {
  return (
    <div>
      <PageHeader 
        title="Banking for Business" 
        description="Scale your enterprise with our powerful financial tools, seamless payments, and dedicated support."
        icon={<Building2 className="h-8 w-8" />}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Corporate Accounts", desc: "Multi-currency accounts designed for global operations." },
            { title: "Merchant Services", desc: "Accept payments anywhere with our integrated checkout solutions." },
            { title: "Business Loans", desc: "Flexible financing to fuel your company's growth." }
          ].map((item, i) => (
            <div key={i} className="p-10 border border-slate-100 no-round hover:border-primary transition-all">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 mb-8">{item.desc}</p>
              <button className="text-primary font-bold flex items-center gap-2 group">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Rewards() {
  return (
    <div>
      <PageHeader 
        title="May Bank Rewards" 
        description="Earn points on every transaction and redeem them for travel, shopping, and exclusive experiences."
        icon={<Gift className="h-8 w-8" />}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">More Than Just Points</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Our rewards program is designed to complement your lifestyle. From airport lounge access 
              to cashback on your favorite brands, we make sure every dollar you spend works harder for you.
            </p>
            <button className="no-round bg-slate-900 px-8 py-4 font-bold text-white hover:bg-primary hover:text-slate-900 transition-all">
              Join Rewards Program
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/travel/400/400" alt="Travel" className="no-round w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/shopping/400/400" alt="Shopping" className="no-round w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/dining/400/400" alt="Dining" className="no-round w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/experience/400/400" alt="Experience" className="no-round w-full h-48 object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BranchMap() {
  return (
    <div className="h-[80vh] bg-slate-100 relative">
      <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-slate-900">Interactive Map Loading...</h2>
          <p className="text-slate-500 mt-2">Finding branches near your location.</p>
        </div>
      </div>
      <div className="absolute top-8 left-8 z-10 w-80 bg-white p-6 no-round shadow-2xl">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Nearby Branches</h3>
        <div className="space-y-4">
          {[
            { name: "Main Square Branch", dist: "0.5 km", open: "Open until 18:00" },
            { name: "Tech Park Hub", dist: "1.2 km", open: "Open until 17:00" },
            { name: "Riverside Center", dist: "2.8 km", open: "Closed" }
          ].map((b, i) => (
            <div key={i} className="p-4 border border-slate-50 hover:border-primary transition-all cursor-pointer">
              <p className="font-bold text-slate-900">{b.name}</p>
              <p className="text-xs text-slate-500">{b.dist} • {b.open}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
