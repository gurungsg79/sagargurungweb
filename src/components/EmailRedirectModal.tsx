import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Laptop, 
  Send, 
  Globe, 
  X, 
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface EmailRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  initialSubject?: string;
}

export const EmailRedirectModal: React.FC<EmailRedirectModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  initialSubject = 'Engineering Inquiry / Opportunity - Sagar Gurung'
}) => {
  const [subject, setSubject] = useState(initialSubject);
  const [copied, setCopied] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject || 'Engineering Inquiry / Opportunity - Sagar Gurung');
      setLaunchStatus(null);
      setCopied(false);
    }
  }, [isOpen, initialSubject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(subject)}`;

  const handleLaunchMachineEmail = () => {
    setLaunchStatus('Redirecting to your machine email application...');
    
    // Attempt standard navigation to trigger native email client
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = mailtoUrl;
    }

    setTimeout(() => {
      setLaunchStatus('Request sent. If your email app did not launch, try the Gmail Web button or copy the email below.');
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      id="email-redirect-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-redirect-title"
    >
      <div 
        id="email-redirect-modal-card"
        className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all relative overflow-hidden ${
          darkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-cyan-950/20' 
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 id="email-redirect-title" className="text-lg sm:text-xl font-extrabold tracking-tight">
                Redirect to Email App
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Direct Contact with Sagar Gurung
              </p>
            </div>
          </div>

          <button
            id="email-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            className={`p-2 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Description */}
        <div className={`p-4 rounded-2xl border mb-5 ${
          darkMode ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-start gap-3">
            <Laptop className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <p className="font-semibold mb-1">
                Would you like to open your computer or device's native email client?
              </p>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                This will automatically launch your system email app (such as Apple Mail, Microsoft Outlook, Thunderbird, or Windows Mail) with the recipient pre-configured.
              </p>
            </div>
          </div>
        </div>

        {/* Email Receiver & Subject Details */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
              Receiver Address
            </label>
            <div className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs sm:text-sm font-semibold ${
              darkMode ? 'bg-slate-950 border-slate-800 text-cyan-300' : 'bg-slate-100 border-slate-200 text-blue-700'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
              <button
                id="email-modal-copy-pill-btn"
                onClick={handleCopyEmail}
                type="button"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  copied 
                    ? 'bg-emerald-500 text-slate-950 font-bold' 
                    : darkMode 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
              Subject Line
            </label>
            <input
              id="email-modal-subject-input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject line..."
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-cyan-500/40 ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' 
                  : 'bg-white border-slate-300 text-slate-800 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        {/* Live Launch Status Notice */}
        {launchStatus && (
          <div className="mb-5 p-3 rounded-xl text-xs flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 animate-in fade-in">
            <Info className="w-4 h-4 shrink-0" />
            <span>{launchStatus}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Primary CTA: Launch Default Machine Email App */}
          <button
            id="email-modal-launch-machine-app-btn"
            onClick={handleLaunchMachineEmail}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            <span>Open Machine Email App</span>
          </button>

          {/* Secondary CTA: Open via Gmail in Web Browser */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              id="email-modal-open-gmail-web-btn"
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>Open in Gmail (Web)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              id="email-modal-copy-address-btn"
              onClick={handleCopyEmail}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Address'}</span>
            </button>
          </div>
        </div>

        {/* Footer info tip */}
        <div className="mt-5 pt-4 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
          <span>Target: {personalInfo.email}</span>
          <button
            onClick={onClose}
            className="hover:underline text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
