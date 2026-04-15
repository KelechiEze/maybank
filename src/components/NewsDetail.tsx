import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { newsData } from '../newsData';

export default function NewsDetail() {
  const { id } = useParams();
  const article = newsData.find(item => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">Article Not Found</h1>
          <Link to="/news" className="mt-6 inline-block text-primary font-bold hover:underline">Back to Newsroom</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={article.image} 
            alt={article.title} 
            className="h-full w-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-4xl w-full px-6 pb-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/news" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:gap-3 transition-all">
                <ArrowLeft className="h-5 w-5" /> Back to Newsroom
              </Link>
              <span className="inline-block px-3 py-1 bg-primary text-slate-900 text-xs font-bold uppercase tracking-widest mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {article.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-8 text-slate-300 font-medium">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {article.date}</span>
                <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {article.author}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {article.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div 
                className="prose prose-lg max-w-none text-slate-600 leading-relaxed
                  prose-headings:text-slate-900 prose-headings:font-bold
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                  prose-p:mb-8 prose-strong:text-slate-900"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              <div className="mt-16 pt-16 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold">
                    <Share2 className="h-5 w-5" /> Share
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold">
                    <Bookmark className="h-5 w-5" /> Save
                  </button>
                </div>
                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold">
                  <MessageSquare className="h-5 w-5" /> Comments (12)
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-12">
                {/* Related News */}
                <div className="bg-slate-50 p-8 no-round border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Related Articles</h3>
                  <div className="space-y-8">
                    {newsData.filter(item => item.id !== article.id).slice(0, 2).map(item => (
                      <Link key={item.id} to={`/news/${item.id}`} className="group block">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                        <h4 className="mt-2 font-bold text-slate-900 group-hover:text-primary transition-all line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs text-slate-400">{item.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-slate-900 p-8 no-round text-white">
                  <h3 className="text-xl font-bold mb-4">Never Miss an Update</h3>
                  <p className="text-slate-400 text-sm mb-8">Get the latest market insights delivered to your inbox weekly.</p>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-primary transition-all font-bold text-sm"
                    />
                    <button className="w-full bg-primary py-3 font-bold text-slate-900 hover:bg-white transition-all">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
