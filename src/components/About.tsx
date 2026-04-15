import { motion } from 'motion/react';
import { Target, Users, History, Leaf, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="About Hero"
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
            About <span className="text-primary">May Bank</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto px-6"
          >
            A legacy of trust, a future of innovation.
          </motion.p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-16 w-16 bg-primary flex items-center justify-center text-slate-900 mb-8">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Our Vision & Mission</h2>
              <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                We envision a world where financial freedom is accessible to everyone. Our mission is to provide the most secure, efficient, and user-friendly banking experience through continuous technological advancement and unwavering integrity.
              </p>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 font-bold text-slate-900">
                  <div className="h-2 w-2 bg-primary" />
                  Customer-Centric Innovation
                </div>
                <div className="flex items-center gap-3 font-bold text-slate-900">
                  <div className="h-2 w-2 bg-primary" />
                  Global Financial Inclusion
                </div>
                <div className="flex items-center gap-3 font-bold text-slate-900">
                  <div className="h-2 w-2 bg-primary" />
                  Absolute Security & Trust
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
                alt="Vision"
                className="no-round w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-slate-900 p-10 no-round hidden md:block">
                <p className="text-primary text-5xl font-black">100%</p>
                <p className="text-white text-sm font-bold uppercase tracking-widest mt-2">Commitment to Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Our Journey</h2>
            <p className="mt-4 text-slate-400">Decades of growth and transformation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TimelineItem year="2001" title="Foundation" description="May Bank was established with a single branch and a big dream." />
            <TimelineItem year="2010" title="Digital Pivot" description="Launched our first online banking portal, revolutionizing user access." />
            <TimelineItem year="2018" title="Global Expansion" description="Opened offices in 12 countries, becoming a truly global player." />
            <TimelineItem year="2024" title="AI Integration" description="Implemented advanced AI for personalized financial advisory." />
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-slate-50 p-12 lg:p-24 no-round flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="h-16 w-16 bg-green-100 flex items-center justify-center text-green-600 mb-8">
                <Leaf className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Sustainability First</h2>
              <p className="mt-6 text-slate-600">
                We are committed to a greener future. From paperless banking to investing in renewable energy projects, sustainability is at the core of our operations.
              </p>
              <button className="no-round mt-10 bg-slate-900 text-white px-8 py-4 font-bold hover:bg-primary hover:text-slate-900 transition-all">
                Read Our ESG Report
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500" alt="Green 1" className="no-round h-64 w-full object-cover" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=500" alt="Green 2" className="no-round h-64 w-full object-cover mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="relative p-8 border border-slate-800 hover:border-primary transition-all group">
      <span className="text-primary text-4xl font-black opacity-20 group-hover:opacity-100 transition-all">{year}</span>
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="mt-4 text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
