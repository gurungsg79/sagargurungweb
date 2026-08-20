/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { SignalSimulator } from './components/SignalSimulator';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CredentialsModal } from './components/CredentialsModal';
import { SearchModal } from './components/SearchModal';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeMode } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Theme mode selection: 'light' | 'dark' | 'system'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('sagar_portfolio_theme_mode') as ThemeMode | null;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      return savedMode;
    }
    // Backward compatibility with legacy boolean storage
    const legacySaved = localStorage.getItem('sagar_portfolio_theme');
    if (legacySaved !== null) {
      return legacySaved === 'dark' ? 'dark' : 'light';
    }
    return 'system'; // Default to adapting to user's device preferences
  });

  // Track the actual device system preference in real time
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to OS/browser appearance changes when in 'system' mode
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    setSystemIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute the resolved effective dark mode
  const darkMode = themeMode === 'system' ? systemIsDark : themeMode === 'dark';

  // Apply class and save preference whenever themeMode or resolved darkMode updates
  useEffect(() => {
    localStorage.setItem('sagar_portfolio_theme_mode', themeMode);
    localStorage.setItem('sagar_portfolio_theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-blue-500/20 selection:text-blue-900';
    }
  }, [themeMode, darkMode]);

  // Section scroll spy
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'simulator', 'blog', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const [credentialsTab, setCredentialsTab] = useState<'resume' | 'transcript-vtu' | 'degree-wneu'>('resume');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [requestedSubject, setRequestedSubject] = useState<string>('Full-Time Opportunity');
  const [requestedMessage, setRequestedMessage] = useState<string>('');

  const handleOpenCredentials = (tab: 'resume' | 'transcript-vtu' | 'degree-wneu' = 'resume') => {
    setCredentialsTab(tab);
    setCredentialsOpen(true);
  };

  const handleRequestInquiry = (subject: string, messageTemplate: string) => {
    setRequestedSubject(subject);
    setRequestedMessage(messageTemplate);
    setCredentialsOpen(false);
    setSearchOpen(false);

    // Smooth scroll to the Send Direct Inquiry contact section
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      // Focus the message input after scrolling
      setTimeout(() => {
        const messageInput = document.getElementById('contact-message-input') as HTMLTextAreaElement | null;
        if (messageInput) {
          messageInput.focus();
        }
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Sticky Main Navigation with Theme Selector */}
      <Navbar
        darkMode={darkMode}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        openSearch={() => setSearchOpen(true)}
        openCredentials={handleOpenCredentials}
        activeSection={activeSection}
      />


      {/* Main Content Areas */}
      <main className="relative">
        <Hero
          darkMode={darkMode}
          openCredentials={handleOpenCredentials}
        />

        <About
          darkMode={darkMode}
          openCredentials={handleOpenCredentials}
        />

        <Skills
          darkMode={darkMode}
        />

        <SignalSimulator
          darkMode={darkMode}
        />

        <Projects
          darkMode={darkMode}
        />

        <Blog
          darkMode={darkMode}
        />

        <Contact
          darkMode={darkMode}
          requestedSubject={requestedSubject}
          requestedMessage={requestedMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        darkMode={darkMode}
        openCredentials={handleOpenCredentials}
      />

      {/* Unified Credentials, Transcripts & Owner Documents Portal */}
      <CredentialsModal
        isOpen={credentialsOpen}
        onClose={() => setCredentialsOpen(false)}
        darkMode={darkMode}
        initialTab={credentialsTab}
        onRequestInquiry={handleRequestInquiry}
      />

      {/* Quick Search Overlay */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        darkMode={darkMode}
        openCredentials={handleOpenCredentials}
      />
    </div>
  );
}
