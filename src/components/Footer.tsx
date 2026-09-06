import React from 'react';
import { 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  FileText, 
  ArrowUp, 
  Heart,
  Globe,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  darkMode: boolean;
  openCredentials: (tab?: 'resume' | 'transcript-vtu' | 'degree-wneu') => void;
  openEmailRedirect?: (subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, openCredentials, openEmailRedirect }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Bio column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className={`font-display font-bold text-lg leading-tight block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {personalInfo.name}
                </span>
                <span className="text-xs font-mono text-cyan-400">MS in Electrical Engineering</span>
              </div>
            </a>

            <p className="text-xs leading-relaxed max-w-sm">
              Western New England University graduate specializing in systems integration, stochastic Kalman filters, VHDL hardware synthesis, and modern responsive web systems.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-2.5 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`p-2.5 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                id="footer-email-btn"
                type="button"
                onClick={() => openEmailRedirect ? openEmailRedirect() : (window.location.href = `mailto:${personalInfo.email}`)}
                aria-label={`Send Email to ${personalInfo.email}`}
                title={`Email ${personalInfo.email} (Redirect to Machine Email App)`}
                className={`p-2.5 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                <Mail className="w-4 h-4" />
              </button>

              <a
                href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                aria-label="Phone Number"
                className={`p-2.5 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Direct Email Action Button */}
            <div className="pt-1">
              <button
                id="footer-email-redirect-cta"
                type="button"
                onClick={() => openEmailRedirect ? openEmailRedirect() : (window.location.href = `mailto:${personalInfo.email}`)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all group ${
                  darkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80' 
                    : 'bg-white border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm'
                }`}
                title="Send email via your machine email app with gurung.sg79@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{personalInfo.email}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Mail App
                </span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home & Overview</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About & Education (WNEU)</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Technical Skills & Tooling</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Academic & Engineering Projects</a></li>
              <li><a href="#simulator" className="hover:text-cyan-400 transition-colors">Interactive Kalman Simulator</a></li>
              <li><a href="#blog" className="hover:text-cyan-400 transition-colors">Technical Publications & Blog</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact & Formspree Form</a></li>
            </ul>
          </div>

          {/* Engineering Topics */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Specializations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-cyan-400 font-mono">#</span> Stochastic Processes</li>
              <li><span className="text-cyan-400 font-mono">#</span> Kalman State Estimation</li>
              <li><span className="text-cyan-400 font-mono">#</span> VHDL RTL Synthesis</li>
              <li><span className="text-cyan-400 font-mono">#</span> Systems Integration</li>
              <li><span className="text-cyan-400 font-mono">#</span> Statistical Quality Control</li>
              <li><span className="text-cyan-400 font-mono">#</span> Web Dashboards & UI/UX</li>
            </ul>
          </div>

          {/* Direct Actions & Credentials */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Academic Credentials
            </h4>
            <div className="space-y-2">
              <button
                id="footer-resume-transcripts-btn"
                onClick={() => openCredentials('resume')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 transition-all group"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Resume & Transcripts</span>
                </span>
                <span className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and back to top */}
        <div className="mt-12 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Sagar Gurung. All Rights Reserved. Built with React, TypeScript & Tailwind CSS.</p>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
