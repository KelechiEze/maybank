import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, TrendingUp, Newspaper, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsData } from '../newsData';

export default function News() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
            alt="News Hero"
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
            May Bank <span className="text-primary">Newsroom</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto px-6"
          >
            Stay updated with the latest trends, market insights, and bank announcements.
          </motion.p>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                <Newspaper className="text-primary" /> Latest Updates
              </h2>
              <div className="space-y-12">
                {newsData.slice(0, 2).map((article) => (
                  <NewsArticle 
                    key={article.id}
                    id={article.id}
                    image={article.image}
                    category={article.category}
                    title={article.title}
                    excerpt={article.excerpt}
                    date={article.date}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-slate-900 p-10 no-round text-white sticky top-32">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <TrendingUp className="text-primary" /> Market Insights
                </h3>
                <div className="space-y-8">
                  <InsightItem title="Interest Rates Outlook" value="+0.25%" trend="up" />
                  <InsightItem title="Tech Sector Growth" value="12.4%" trend="up" />
                  <InsightItem title="Inflation Index" value="3.1%" trend="down" />
                  <InsightItem title="Crypto Adoption" value="High" trend="up" />
                </div>
                <Link 
                  to={`/news/${newsData[0].id}`}
                  className="no-round mt-10 w-full bg-primary py-4 font-bold text-slate-900 hover:bg-white transition-all inline-block text-center"
                >
                  View Full Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
            <Globe className="text-primary" /> Press Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PressItem id={newsData[2].id} title={newsData[2].title} date={newsData[2].date} />
            <PressItem id={newsData[0].id} title="Strategic Partnership with Global Fintech Hub" date={newsData[0].date} />
            <PressItem id={newsData[1].id} title="Annual Sustainability Report Released" date={newsData[1].date} />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Subscribe to Our Newsletter</h2>
          <p className="mt-4 text-slate-800">Get the latest financial news delivered straight to your inbox.</p>
          <div className="mt-10 flex flex-col md:flex-row max-w-2xl mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="no-round flex-1 px-6 py-4 bg-white outline-none font-bold"
            />
            <button className="no-round bg-slate-900 text-white px-10 py-4 font-bold hover:bg-slate-800 transition-all">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsArticle({ id, image, category, title, excerpt, date }: any) {
  return (
    <Link to={`/news/${id}`} className="flex flex-col md:flex-row gap-8 group">
      <div className="md:w-1/3 overflow-hidden">
        <img src={image} alt={title} className="no-round h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
      </div>
      <div className="md:w-2/3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">{category}</span>
        <h3 className="text-2xl font-bold text-slate-900 mt-2 group-hover:text-primary transition-all">{title}</h3>
        <p className="mt-4 text-slate-600 line-clamp-2">{excerpt}</p>
        <div className="mt-6 flex items-center gap-6 text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {date}</span>
          <span className="flex items-center gap-2"><User className="h-4 w-4" /> Admin</span>
        </div>
      </div>
    </Link>
  );
}

function InsightItem({ title, value, trend }: any) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
      <span className="text-slate-400 font-medium">{title}</span>
      <div className="flex items-center gap-3">
        <span className="font-bold">{value}</span>
        <div className={`h-2 w-2 rounded-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
    </div>
  );
}

function PressItem({ id, title, date }: any) {
  return (
    <Link to={`/news/${id}`} className="bg-white p-8 no-round border border-slate-100 hover:border-primary transition-all group block">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{date}</p>
      <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-primary transition-all">{title}</h3>
      <div className="mt-6 flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-primary transition-all">
        Read More <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
