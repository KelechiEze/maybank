import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Globe } from 'lucide-react';

export default function GetInTouch() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Hero"
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
            Get In <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto px-6"
          >
            We're here to help you with any questions or concerns.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard 
              icon={<Phone />} 
              title="Call Us" 
              info="+1 (555) 123-4567" 
              subInfo="Mon-Fri: 9am - 6pm" 
            />
            <ContactCard 
              icon={<Mail />} 
              title="Email Us" 
              info="support@maybank.com" 
              subInfo="24/7 Online Support" 
            />
            <ContactCard 
              icon={<MapPin />} 
              title="Visit Us" 
              info="123 Financial Plaza" 
              subInfo="New York, NY 10001" 
            />
          </div>
        </div>
      </section>

      {/* Message Form & Map */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="bg-white p-12 no-round shadow-xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Full Name" placeholder="John Doe" />
                    <FormInput label="Email" placeholder="john@example.com" type="email" />
                  </div>
                  <FormInput label="Subject" placeholder="General Inquiry" />
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="How can we help you?" 
                      className="no-round w-full px-6 py-4 bg-slate-50 border border-slate-100 outline-none font-bold text-slate-900 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button className="no-round w-full bg-slate-900 text-white py-5 font-black uppercase tracking-widest hover:bg-primary hover:text-slate-900 transition-all flex items-center justify-center gap-3">
                    Send Message
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="h-full min-h-[400px] bg-slate-200 no-round relative overflow-hidden">
                {/* Mock Map Placeholder */}
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Map Location"
                  className="h-full w-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-12 w-12 bg-slate-900 flex items-center justify-center text-primary rounded-full animate-bounce shadow-2xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Global Presence</h2>
            <p className="mt-4 text-slate-500">Find us in major financial hubs across the world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <LocationItem city="Bangkok" country="Thailand" />
            <LocationItem city="New York" country="USA" />
            <LocationItem city="London" country="UK" />
            <LocationItem city="Singapore" country="SG" />
            <LocationItem city="Tokyo" country="JP" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, info, subInfo }: any) {
  return (
    <div className="no-round p-10 border border-slate-100 bg-white hover:border-primary transition-all group text-center">
      <div className="h-16 w-16 mx-auto bg-slate-900 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-slate-900 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-lg font-black text-slate-900">{info}</p>
      <p className="mt-2 text-sm text-slate-500 font-medium">{subInfo}</p>
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

function LocationItem({ city, country }: any) {
  return (
    <div className="flex items-center gap-4 p-6 bg-slate-50 no-round border border-transparent hover:border-primary transition-all group">
      <Globe className="h-6 w-6 text-slate-400 group-hover:text-primary transition-all" />
      <div>
        <h4 className="font-bold text-slate-900">{city}</h4>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{country}</p>
      </div>
    </div>
  );
}
