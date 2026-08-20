import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Activity, 
  Cpu, 
  Layers, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Download, 
  Github, 
  Linkedin,
  Terminal,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';

interface HeroProps {
  darkMode: boolean;
  openCredentials: (tab?: 'resume' | 'transcript-vtu' | 'degree-wneu') => void;
}

export const Hero: React.FC<HeroProps> = ({ darkMode, openCredentials }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "Electrical Engineering Master's Graduate",
    "Systems Integration Specialist",
    "VHDL & Digital System Designer",
    "Stochastic Processes & Kalman Filter Specialist",
    "Web Development & Systems Management Student"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Mesh / Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 ${
          darkMode ? 'bg-cyan-600/30' : 'bg-blue-300/40'
        }`} />
        <div className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-indigo-600/30' : 'bg-cyan-200/40'
        }`} />
        
        {/* Subtle Engineering Dot Grid */}
        <div 
          className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'invert-0' : 'invert'}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
            darkMode 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-900/20' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Technical Opportunities</span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border ${
            darkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <MapPin className="w-3.5 h-3.5 text-cyan-500" />
            <span>{personalInfo.location}</span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border ${
            darkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>WNEU Alum (Dec '23)</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-4 sm:mb-6">
            <span className="block">Hello, I'm</span>
            <span className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent ${
              !darkMode && 'from-blue-700 via-indigo-600 to-cyan-600'
            }`}>
              {personalInfo.name}
            </span>
          </h1>

          {/* Dynamic Role Banner */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
            <p className={`text-base sm:text-xl font-medium tracking-tight transition-all duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <span className="text-cyan-500 font-mono mr-2">&gt;</span>
              <span className="border-b-2 border-cyan-500/40 pb-0.5 font-semibold">
                {roles[roleIndex]}
              </span>
            </p>
          </div>

          {/* Concise Bio */}
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Graduate from <strong className={darkMode ? 'text-white' : 'text-slate-900'}>Western New England University</strong> (MS in Electrical Engineering, GPA 3.19). 
            Specializing in <span className="text-cyan-400 font-medium">systems integration</span>, <span className="text-blue-400 font-medium">VHDL & digital logic</span>, <span className="text-indigo-400 font-medium">stochastic Kalman filtering</span>, and <span className="text-emerald-400 font-medium">modern web management</span>.
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <a
              id="hero-explore-projects-btn"
              href="#projects"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-102 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:shadow-cyan-500/25 shadow-cyan-500/10'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 shadow-blue-500/20'
              }`}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-simulator-btn"
              href="#simulator"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-102 ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>Kalman Lab Live</span>
            </a>

            <button
              id="hero-view-resume-btn"
              onClick={() => openCredentials('resume')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-102 ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-indigo-500 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Resume & Transcripts</span>
            </button>

            <a
              id="hero-contact-btn"
              href="#contact"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all ${
                darkMode
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Quick Connect Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                darkMode
                  ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              <span>{personalInfo.email}</span>
              {copiedEmail ? (
                <span className="text-emerald-400 text-[10px] font-sans font-semibold">✓ Copied!</span>
              ) : (
                <span className="text-[10px] text-slate-500">(Click to copy)</span>
              )}
            </button>

            <a
              href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                darkMode
                  ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{personalInfo.phone}</span>
            </a>
          </div>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              id={`stat-card-${idx}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all hover:translate-y-[-2px] ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/90 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  darkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  {stat.value}
                </span>
                <span className={`w-2 h-2 rounded-full ${
                  idx === 0 ? 'bg-cyan-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-indigo-500' : 'bg-emerald-500'
                }`} />
              </div>
              <p className={`text-xs sm:text-sm font-semibold mb-0.5 ${
                darkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>
                {stat.label}
              </p>
              <p className={`text-[11px] sm:text-xs truncate ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Down Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#about"
            aria-label="Scroll to About section"
            className={`p-2 rounded-full border transition-all animate-bounce ${
              darkMode 
                ? 'border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40' 
                : 'border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
