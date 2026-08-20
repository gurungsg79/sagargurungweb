import React, { useEffect, useState } from 'react';
import { Cpu, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFading(true);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500 ${
      isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="relative flex flex-col items-center">
        {/* Animated Emblem */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-xl shadow-cyan-500/20 animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-cyan-500/30 animate-ping opacity-40" />
        </div>

        <h2 className="font-display text-xl font-bold tracking-tight mb-1">
          Sagar Gurung
        </h2>
        <p className="text-xs font-mono text-cyan-400 mb-6 tracking-wider">
          INITIALIZING PORTFOLIO & TELEMETRY MODULES...
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-slate-500 mt-2">
          {progress}%
        </span>
      </div>
    </div>
  );
};
