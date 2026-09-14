import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../../data/journal';

export const JournalView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Technical Textile Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
          The Reshma Tex Journal
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
          Deep-dive technical whitepapers, yarn engineering analyses, international trade compliance, and sustainable finishing innovations written by our engineers.
        </p>
      </div>

      {/* Article Detail View or Listing */}
      {selectedArticle ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 space-y-6 shadow-sm">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-mono text-amber-700 hover:text-amber-900 flex items-center gap-1 font-semibold"
          >
            &larr; Back to all articles
          </button>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              {selectedArticle.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {selectedArticle.title}
            </h2>
            <div className="flex items-center gap-4 text-xs font-mono text-stone-500 pt-1">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedArticle.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}</span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6 text-stone-700 text-sm leading-relaxed space-y-4 font-sans">
            <p className="text-base text-stone-900 font-medium">
              {selectedArticle.summary}
            </p>
            {selectedArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs font-mono text-stone-400">Reshma Tex Technical Whitepaper Series</span>
            <button
              onClick={() => setSelectedArticle(null)}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              Back to Journal
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md hover:border-amber-600/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {article.category}
                </span>

                <h2 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {article.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>{article.readTime}</span>
                <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
