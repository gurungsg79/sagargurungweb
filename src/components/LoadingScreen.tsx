import React, { useEffect, useState, useRef } from 'react';
import { Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      setIsFading(true);
      setTimeout(() => {
        onCompleteRef.current();
      }, 300);
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finish();
          return 100;
        }
        return prev + 25;
      });
    }, 50);

    // Hard fallback timeout: guarantees loading screen always clears within 800ms
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      finish();
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div 
      aria-hidden={isFading}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center px-4">
        {/* Animated Emblem */}
        <div className="relative mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-xl shadow-cyan-500/20 animate-pulse">
            <Cpu className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-cyan-500/30 animate-ping opacity-40" />
        </div>

        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-1 text-slate-100">
          Sagar Gurung
        </h2>
        <p className="text-xs font-mono text-cyan-400 mb-6 tracking-wider text-center">
          SYSTEMS & WEB PLATFORM INITIALIZING...
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-slate-500 mt-2">
          {Math.min(progress, 100)}%
        </span>
      </div>
    </div>
  );
};
