import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight,
  List,
  Share2,
  Check
} from 'lucide-react';
import { blogPosts } from '../data/portfolioData';
import { BlogPost } from '../types';

interface BlogProps {
  darkMode: boolean;
}

export const Blog: React.FC<BlogProps> = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Extract all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(p => p.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Publications & Insights</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Engineering <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Articles & Notes</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Deep dives into stochastic estimation, digital synthesis paradigms, industrial telemetry architectures, and quality engineering.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' 
                : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              selectedTag === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : darkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 border border-slate-200 text-slate-600'
            }`}
          >
            #all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : darkMode
                    ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-slate-100 border border-slate-200 text-slate-600'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            id={`blog-card-${post.id}`}
            onClick={() => setSelectedPost(post)}
            className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all duration-300 hover:translate-y-[-4px] flex flex-col justify-between ${
              darkMode 
                ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 shadow-xl' 
                : 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-tight mb-2.5 hover:text-emerald-400 transition-colors">
                {post.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {post.excerpt}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Read Full Publication</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className={`max-w-3xl w-full my-8 p-6 sm:p-10 rounded-3xl border shadow-2xl relative ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {selectedPost.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedPost.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                  title="Share Article Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-slate-400 hover:text-white text-sm font-semibold p-1"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-6">
              <span>By Sagar Gurung</span>
              <span>•</span>
              <span>Published {selectedPost.date}</span>
            </div>

            {/* Table of Contents Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-2">
                <List className="w-3.5 h-3.5" />
                <span>SECTION OVERVIEW</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedPost.tableOfContents.map((toc, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{toc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Article Content Rendered */}
            <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4 text-slate-300 whitespace-pre-line font-sans">
              {selectedPost.content}
            </div>

            {/* Tags footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
