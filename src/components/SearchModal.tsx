import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  FolderGit2, 
  Cpu, 
  BookOpen, 
  Briefcase, 
  FileText, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2
} from 'lucide-react';
import { 
  projects, 
  skillCategories, 
  coursesDetails, 
  experiences, 
  blogPosts 
} from '../data/portfolioData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  openCredentials: (tab?: 'resume' | 'transcript-vtu' | 'degree-wneu') => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  openCredentials
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keydown handler for Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results aggregation
  const projectResults = projects.filter(p => 
    !normalizedQuery || 
    p.title.toLowerCase().includes(normalizedQuery) ||
    p.shortDescription.toLowerCase().includes(normalizedQuery) ||
    p.tools.some(t => t.toLowerCase().includes(normalizedQuery))
  ).slice(0, 3);

  const allSkills = skillCategories.flatMap(c => c.skills);
  const skillResults = allSkills.filter(s =>
    !normalizedQuery ||
    s.name.toLowerCase().includes(normalizedQuery) ||
    s.category.toLowerCase().includes(normalizedQuery)
  ).slice(0, 4);

  const courseResults = coursesDetails.filter(c =>
    !normalizedQuery ||
    c.name.toLowerCase().includes(normalizedQuery) ||
    c.code.toLowerCase().includes(normalizedQuery) ||
    c.toolsUsed.some(t => t.toLowerCase().includes(normalizedQuery))
  ).slice(0, 3);

  const blogResults = blogPosts.filter(b =>
    !normalizedQuery ||
    b.title.toLowerCase().includes(normalizedQuery) ||
    b.tags.some(t => t.toLowerCase().includes(normalizedQuery))
  ).slice(0, 2);

  const totalResultsCount = projectResults.length + skillResults.length + courseResults.length + blogResults.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className={`max-w-2xl w-full rounded-3xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[80vh] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-800/60 flex items-center gap-3 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, coursework, articles, or resume..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-6 text-xs sm:text-sm">
          {totalResultsCount === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-base font-semibold mb-1">No matches found for "{query}"</p>
              <p className="text-xs">Try searching for terms like "Kalman", "VHDL", "ModelSim", "Python", or "Takeo".</p>
            </div>
          ) : (
            <>
              {/* Quick Actions */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-bold">
                  Quick Actions & Portals
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => { onClose(); openCredentials('resume'); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 text-left flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2 font-medium text-xs text-slate-200">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Printable Resume</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => { onClose(); openCredentials('transcript-vtu'); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 text-left flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2 font-medium text-xs text-slate-200">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>VTU Transcript</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => { onClose(); openCredentials('degree-wneu'); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 text-left flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2 font-medium text-xs text-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WNEU Master's Record</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Projects */}
              {projectResults.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-bold flex items-center gap-1.5">
                    <FolderGit2 className="w-3 h-3 text-indigo-400" />
                    <span>Projects ({projectResults.length})</span>
                  </p>
                  <div className="space-y-1.5">
                    {projectResults.map(p => (
                      <a
                        key={p.id}
                        href="#projects"
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/70 hover:border-indigo-500/40 hover:bg-slate-950 flex items-center justify-between block transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-xs text-slate-200">{p.title}</p>
                          <p className="text-[11px] text-slate-400">{p.categoryLabel} • {p.period}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {skillResults.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-bold flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    <span>Skills & Technologies</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {skillResults.map((s, idx) => (
                      <a
                        key={idx}
                        href="#skills"
                        onClick={onClose}
                        className="p-2 rounded-xl bg-slate-950/50 border border-slate-800 text-center hover:border-cyan-500/40 block transition-colors"
                      >
                        <p className="font-semibold text-xs text-cyan-300 truncate">{s.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{s.category}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Coursework */}
              {courseResults.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                    <span>Master's Coursework</span>
                  </p>
                  <div className="space-y-1.5">
                    {courseResults.map(c => (
                      <a
                        key={c.code}
                        href="#about"
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/70 hover:border-blue-500/40 hover:bg-slate-950 flex items-center justify-between block transition-colors"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-bold text-cyan-400 mr-2">{c.code}</span>
                          <span className="font-semibold text-xs text-slate-200">{c.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Posts */}
              {blogResults.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2 font-bold flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-emerald-400" />
                    <span>Technical Articles</span>
                  </p>
                  <div className="space-y-1.5">
                    {blogResults.map(b => (
                      <a
                        key={b.id}
                        href="#blog"
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/70 hover:border-emerald-500/40 hover:bg-slate-950 flex items-center justify-between block transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-xs text-slate-200">{b.title}</p>
                          <p className="text-[11px] text-emerald-400 font-mono">{b.category} • {b.readTime}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 border-t border-slate-800/60 bg-slate-950/70 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">ESC</kbd> to close</span>
          </div>
          <span className="text-cyan-400">Sagar Gurung Portfolio</span>
        </div>
      </div>
    </div>
  );
};
