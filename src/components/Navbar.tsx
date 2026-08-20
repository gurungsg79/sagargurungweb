import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Laptop,
  Menu, 
  X, 
  Search, 
  FileText, 
  HelpCircle, 
  Cpu, 
  ArrowUpRight,
  Sparkles,
  Check,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface NavbarProps {
  darkMode: boolean;
  themeMode: ThemeMode;
  setThemeMode: (val: ThemeMode) => void;
  openSearch: () => void;
  openCredentials: (tab?: 'resume' | 'transcript-vtu' | 'degree-wneu') => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  themeMode,
  setThemeMode,
  openSearch,
  openCredentials,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Articles', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      mode: 'light',
      label: 'Light',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      desc: 'Crisp high-contrast day theme'
    },
    {
      mode: 'dark',
      label: 'Dark',
      icon: <Moon className="w-3.5 h-3.5 text-cyan-400" />,
      desc: 'Deep slate telemetry dark theme'
    },
    {
      mode: 'system',
      label: 'System',
      icon: <Laptop className="w-3.5 h-3.5 text-indigo-400" />,
      desc: 'Auto-adapts with device theme'
    }
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? darkMode 
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' 
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-200/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a 
            id="brand-logo-link"
            href="#home" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105 ${
              darkMode 
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20' 
                : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
            }`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold tracking-tight text-base sm:text-lg leading-tight transition-colors ${
                darkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
              }`}>
                {personalInfo.name}
              </span>
              <span className={`text-xs font-mono tracking-wider ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                MS in Electrical Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? darkMode
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                      : darkMode
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools & CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Search trigger */}
            <button
              id="search-trigger-btn"
              onClick={openSearch}
              title="Search website (Cmd+K)"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 shadow-xs'
              }`}>
                ⌘K
              </kbd>
            </button>

            {/* Segmented Theme Switcher: Light | Dark | Auto */}
            <div 
              id="theme-segmented-control"
              className={`flex items-center p-1 rounded-xl border text-xs font-mono transition-all ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
              title={`Active theme: ${themeMode} (${darkMode ? 'Dark' : 'Light'})`}
            >
              {themeOptions.map((opt) => {
                const isSelected = themeMode === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    id={`theme-btn-${opt.mode}`}
                    onClick={() => setThemeMode(opt.mode)}
                    title={`${opt.label}: ${opt.desc}`}
                    aria-label={`Select ${opt.label} theme`}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected
                        ? darkMode
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs font-bold'
                          : 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                        : darkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {opt.icon}
                    <span className="hidden md:inline">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Transcripts & Credentials Portal Trigger */}
            <button
              id="transcripts-portal-btn"
              onClick={() => openCredentials('transcript-vtu')}
              title="Official VTU Bachelor's Transcript & Academic Records"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-indigo-300 hover:text-white hover:border-indigo-500/50'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100 hover:border-indigo-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xl:inline">VTU Transcript</span>
            </button>

            {/* Resume & Transcripts Main Button */}
            <button
              id="view-resume-nav-btn"
              onClick={() => openCredentials('resume')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/10'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-blue-500/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume & Transcripts</span>
            </button>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              id="mobile-search-btn"
              onClick={openSearch}
              aria-label="Search"
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick 1-tap cycle theme on mobile */}
            <button
              id="mobile-theme-cycle-btn"
              onClick={() => {
                if (themeMode === 'light') setThemeMode('dark');
                else if (themeMode === 'dark') setThemeMode('system');
                else setThemeMode('light');
              }}
              title={`Theme: ${themeMode}`}
              aria-label="Toggle theme mode"
              className={`p-2 rounded-lg border flex items-center justify-center ${
                darkMode ? 'bg-slate-900 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {themeMode === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : themeMode === 'dark' ? (
                <Moon className="w-4 h-4 text-cyan-400" />
              ) : (
                <Laptop className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-4 transition-all ${
            darkMode 
              ? 'bg-slate-950/95 border-slate-800 text-white backdrop-blur-xl' 
              : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-xl shadow-xl'
          }`}
        >
          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 py-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border text-center transition-colors ${
                  activeSection === link.href.substring(1)
                    ? darkMode
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      : 'bg-blue-50 text-blue-700 border-blue-300'
                    : darkMode
                      ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme Preference Segment in Mobile */}
          <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Appearance Theme
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                darkMode ? 'bg-slate-800 text-cyan-400' : 'bg-slate-200 text-blue-700'
              }`}>
                {themeMode === 'system' ? 'Device Auto' : themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => {
                const isSelected = themeMode === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    onClick={() => setThemeMode(opt.mode)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? darkMode
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-white border-blue-500 text-blue-700 shadow-sm font-bold'
                        : darkMode
                          ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="mb-1">{opt.icon}</div>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              {themeMode === 'system' 
                ? '⚡ System mode automatically synchronizes with your device dark/light schedule.' 
                : themeMode === 'light' 
                  ? '☀️ Light mode locked for bright daylight reading.' 
                  : '🌙 Dark mode locked for low-light engineering focus.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCredentials('resume');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume & Credentials</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCredentials('transcript-vtu');
              }}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm border ${
                darkMode ? 'bg-slate-900 border-slate-700 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Official VTU Transcripts (B.E.)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

