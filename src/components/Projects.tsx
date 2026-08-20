import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Code2, 
  Activity, 
  Layers, 
  Cpu, 
  ChevronRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCode, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  darkMode: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'digital-systems', label: 'Digital Systems & VHDL' },
    { id: 'signal-processing', label: 'Signal Processing & Kalman' },
    { id: 'systems-integration', label: 'Systems Integration' },
    { id: 'web-management', label: 'Web & Management' },
  ];

  const filteredProjects = projects.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Engineering Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Academic & Technical <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Hands-on implementations in register-transfer logic, stochastic estimation filters, industrial protocol gateways, and responsive engineering software.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`project-category-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? darkMode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                : darkMode
                  ? 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
              darkMode 
                ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40 shadow-xl' 
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                  darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {project.categoryLabel.split('&')[0]}
                </span>
                <span className="text-xs font-mono text-slate-400">{project.period}</span>
              </div>

              <h3 className="text-lg font-bold tracking-tight mb-2.5 line-clamp-2">
                {project.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.shortDescription}
              </p>

              {/* Metrics Pills if available */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-[10px] font-mono text-slate-400">{m.label}</p>
                      <p className="text-xs font-bold text-cyan-400">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {/* Tool tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tools.slice(0, 4).map((tool, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                    +{project.tools.length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                >
                  <span>Project Deep Dive</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                {project.liveDemoType === 'kalman' && (
                  <a
                    href="#simulator"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                  >
                    <Activity className="w-3 h-3" />
                    <span>Live Lab</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className={`max-w-2xl w-full my-8 p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {selectedProject.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedProject.period}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white text-sm font-semibold p-1"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-3">{selectedProject.title}</h3>
            
            <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedProject.fullDescription}
            </p>

            {/* Metrics */}
            {selectedProject.metrics && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <p className="text-xs font-mono text-slate-400">{m.label}</p>
                    <p className="text-lg font-bold text-cyan-400">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono">
                Key Deliverables & Architectural Results
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Viewer */}
            {selectedProject.codeSnippet && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Snippet: {selectedProject.codeSnippet.language.toUpperCase()}</span>
                  </span>
                  <button
                    onClick={() => handleCopySnippet(selectedProject.codeSnippet!.code)}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono text-slate-200">
                  <pre>{selectedProject.codeSnippet.code}</pre>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 italic">
                  {selectedProject.codeSnippet.description}
                </p>
              </div>
            )}

            {/* Tools Used */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Engineering Stack & Packages
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/40">
              {selectedProject.liveDemoType === 'kalman' && (
                <a
                  href="#simulator"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Open Interactive Live Lab</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
