import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  Code2, 
  Activity, 
  Layers, 
  Cpu, 
  Globe,
  ChevronRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCode, 
  LayoutGrid,
  GitCommit,
  GitBranch,
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowDownUp,
  SlidersHorizontal,
  Milestone
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  darkMode: boolean;
}

type ViewMode = 'grid' | 'timeline';
type TimelineOrder = 'chronological' | 'reverse';

interface MilestonePhase {
  period: string;
  year: string;
  title: string;
  theme: string;
  color: string;
  description: string;
}

export const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [timelineOrder, setTimelineOrder] = useState<TimelineOrder>('chronological');
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

  // Chronological weight for sorting
  const getProjectYearWeight = (period: string): number => {
    if (period.includes('2022')) return 2022.5;
    if (period.includes('Spring 2023')) return 2023.2;
    if (period.includes('Fall 2023')) return 2023.8;
    if (period.includes('2024') || period.includes('2025')) return 2024.5;
    return 2023.0;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'digital-systems':
        return Cpu;
      case 'signal-processing':
        return Activity;
      case 'systems-integration':
        return Layers;
      case 'web-management':
        return Globe;
      default:
        return Code2;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'digital-systems':
        return {
          border: darkMode ? 'border-indigo-500/30' : 'border-indigo-200',
          badge: darkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
          glow: 'from-indigo-500 to-purple-600',
          text: 'text-indigo-400',
          dot: 'bg-indigo-500',
        };
      case 'signal-processing':
        return {
          border: darkMode ? 'border-cyan-500/30' : 'border-cyan-200',
          badge: darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-200',
          glow: 'from-cyan-500 to-blue-600',
          text: 'text-cyan-400',
          dot: 'bg-cyan-500',
        };
      case 'systems-integration':
        return {
          border: darkMode ? 'border-emerald-500/30' : 'border-emerald-200',
          badge: darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
          glow: 'from-emerald-500 to-teal-600',
          text: 'text-emerald-400',
          dot: 'bg-emerald-500',
        };
      case 'web-management':
        return {
          border: darkMode ? 'border-blue-500/30' : 'border-blue-200',
          badge: darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
          glow: 'from-blue-500 to-cyan-600',
          text: 'text-blue-400',
          dot: 'bg-blue-500',
        };
      default:
        return {
          border: darkMode ? 'border-slate-700' : 'border-slate-200',
          badge: darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200',
          glow: 'from-slate-500 to-slate-700',
          text: 'text-slate-400',
          dot: 'bg-slate-500',
        };
    }
  };

  const filteredProjects = useMemo(() => {
    let list = projects.filter(p => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    });

    return list.sort((a, b) => {
      const weightA = getProjectYearWeight(a.period);
      const weightB = getProjectYearWeight(b.period);
      return timelineOrder === 'chronological' ? weightA - weightB : weightB - weightA;
    });
  }, [activeCategory, timelineOrder]);

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const evolutionMilestones: MilestonePhase[] = [
    {
      period: 'Summer 2022',
      year: '2022',
      title: 'Stochastic Systems & Estimation Algorithms',
      theme: 'Mathematical Rigor & Noise Filtering',
      color: 'cyan',
      description: 'Dynamic state estimation, Kalman filtering, state-space covariance tracking in MATLAB/Python.'
    },
    {
      period: 'Spring 2023',
      year: '2023',
      title: 'Digital Systems, RTL & Hardware Architecture',
      theme: 'Synthesizable VHDL & FPGA Verification',
      color: 'indigo',
      description: 'Pipelined RTL datapaths, FSM controllers, Hamming error correction, and ModelSim testbenches.'
    },
    {
      period: 'Fall 2023',
      year: '2023',
      title: 'Heterogeneous Integration & Quality Engineering',
      theme: 'HIL Stress Testing & Yield Optimization',
      color: 'emerald',
      description: 'Industrial protocol gateways (UART/Modbus), sensor telemetry aggregation, and statistical process control.'
    },
    {
      period: '2024 – 2025',
      year: '2024-2025',
      title: 'Modern Telemetry Platforms & Full-Stack Systems',
      theme: 'Real-Time Web Instrumentation & APIs',
      color: 'blue',
      description: 'Sub-10ms UI telemetry visualizers, responsive dashboards, high-frequency chart updates, and cloud hosting.'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-3 border border-indigo-500/30 text-indigo-400 bg-indigo-500/10 shadow-sm">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Engineering Portfolio & Chronology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Academic & Technical <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          The engineering journey spans mathematical stochastic filtering, digital RTL hardware synthesis, multi-subsystem industrial gateways, and high-performance telemetry software.
        </p>
      </div>

      {/* Evolution Summary Journey Ribbon (Quick Overview) */}
      <div className={`mb-10 p-5 rounded-3xl border transition-all ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Engineering Progression Trajectory</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  2022 → 2025
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                From theoretical mathematics & RTL silicon design to physical integration & interactive telemetry platforms.
              </p>
            </div>
          </div>

          {/* View Mode & Timeline Order Controls */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
            {/* View Mode Toggle */}
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                id="view-timeline-btn"
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'timeline'
                    ? darkMode
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'bg-blue-600 text-white shadow-md font-bold'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View projects along a vertical chronological timeline"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Timeline View</span>
              </button>

              <button
                id="view-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? darkMode
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'bg-blue-600 text-white shadow-md font-bold'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View projects in a responsive card grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card Grid</span>
              </button>
            </div>

            {/* Timeline Sorting Toggle (Only in timeline view) */}
            {viewMode === 'timeline' && (
              <button
                id="timeline-order-toggle"
                onClick={() => setTimelineOrder(prev => prev === 'chronological' ? 'reverse' : 'chronological')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                }`}
                title="Change timeline chronological direction"
              >
                <ArrowDownUp className="w-3 h-3 text-cyan-400" />
                <span>{timelineOrder === 'chronological' ? 'Oldest → Newest' : 'Newest → Oldest'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {evolutionMilestones.map((phase, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                darkMode ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-bold text-cyan-400">
                  {phase.period}
                </span>
                <span className="text-[10px] font-mono text-slate-500">Stage 0{idx + 1}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 mb-1 leading-snug">
                {phase.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
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

      {/* VIEW 1: VERTICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div className="relative py-6 max-w-5xl mx-auto">
          {/* Vertical Spine (Center on Desktop, Left on Mobile) */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 opacity-40 shadow-sm" />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-14 relative">
            {filteredProjects.map((project, index) => {
              const IconComponent = getCategoryIcon(project.category);
              const theme = getCategoryTheme(project.category);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  id={`timeline-node-${project.id}`}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge on the Timeline Spine */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr ${theme.glow} flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 ring-4 ${
                      darkMode ? 'ring-slate-950' : 'ring-white'
                    } transition-transform hover:scale-110`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Spacer for dual-column alignment on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Project Timeline Card */}
                  <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${
                    isEven ? 'md:pr-10' : 'md:pl-10'
                  }`}>
                    <div className={`p-6 rounded-3xl border transition-all duration-300 hover:translate-y-[-3px] ${
                      darkMode 
                        ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 shadow-xl' 
                        : 'bg-white border-slate-200 hover:border-blue-400 shadow-md'
                    }`}>
                      {/* Top Meta Line: Period + Category */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${theme.badge}`}>
                          {project.categoryLabel}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold bg-slate-950/60 px-2.5 py-0.5 rounded-lg border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{project.period}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2.5">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {project.shortDescription}
                      </p>

                      {/* Key Highlights / Bullets in Timeline */}
                      <div className="mb-4 space-y-1.5">
                        {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Pill Grid */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="text-center">
                              <p className="text-[10px] font-mono text-slate-400 truncate">{m.label}</p>
                              <p className="text-xs font-bold text-cyan-400">{m.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tools Used Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                        >
                          <span>Deep Dive & Architecture</span>
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: RESPONSIVE CARDS GRID VIEW */}
      {viewMode === 'grid' && (
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
      )}

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
