import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Cpu, 
  Maximize2,
  TrendingUp,
  BarChart2
} from 'lucide-react';

interface SignalSimulatorProps {
  darkMode: boolean;
}

export const SignalSimulator: React.FC<SignalSimulatorProps> = ({ darkMode }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [signalType, setSignalType] = useState<'sine' | 'step' | 'harmonic' | 'ramp'>('sine');
  const [noiseVariance, setNoiseVariance] = useState<number>(0.8);
  const [qFactor, setQFactor] = useState<number>(0.05); // Process noise covariance Q
  const [rFactor, setRFactor] = useState<number>(0.8);  // Measurement noise covariance R
  const [timeStep, setTimeStep] = useState<number>(0);

  // Store 60 data points for continuous streaming
  const [dataPoints, setDataPoints] = useState<{
    t: number;
    trueSignal: number;
    noisySignal: number;
    kalmanEstimate: number;
    kalmanGain: number;
  }[]>([]);

  // Kalman state references for recursive step
  const kalmanState = useRef<{ x: number; p: number }>({ x: 0, p: 1.0 });

  // Generate ground truth signal based on selected waveform
  const getGroundTruth = (t: number) => {
    switch (signalType) {
      case 'sine':
        return 3 * Math.sin(t * 0.15) + Math.cos(t * 0.05);
      case 'step':
        return Math.floor(t / 20) % 2 === 0 ? 3.0 : -3.0;
      case 'harmonic':
        return 2.5 * Math.sin(t * 0.1) + 1.2 * Math.sin(t * 0.3) + 0.6 * Math.sin(t * 0.7);
      case 'ramp':
        return ((t % 40) - 20) * 0.2 + 2 * Math.sin(t * 0.1);
      default:
        return 3 * Math.sin(t * 0.15);
    }
  };

  // Gaussian pseudo-random generator
  const gaussianRandom = (mean = 0, stdev = 1) => {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  };

  // Reset simulator
  const handleReset = () => {
    kalmanState.current = { x: 0, p: 1.0 };
    setTimeStep(0);
    setDataPoints([]);
  };

  // Run simulation step
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeStep((prevT) => {
        const nextT = prevT + 1;
        const trueVal = getGroundTruth(nextT);
        const noise = gaussianRandom(0, Math.sqrt(noiseVariance));
        const noisyVal = trueVal + noise;

        // Kalman Recursive Steps
        // 1. Time Update (Predict)
        const x_pred = kalmanState.current.x; // State transition A = 1
        const p_pred = kalmanState.current.p + qFactor; // Q addition

        // 2. Measurement Update (Correct)
        const innovation = noisyVal - x_pred; // H = 1
        const S = p_pred + rFactor; // Innovation covariance
        const K = p_pred / S; // Kalman gain
        const x_est = x_pred + K * innovation;
        const p_est = (1 - K) * p_pred;

        kalmanState.current = { x: x_est, p: p_est };

        setDataPoints((prevData) => {
          const newPt = {
            t: nextT,
            trueSignal: trueVal,
            noisySignal: noisyVal,
            kalmanEstimate: x_est,
            kalmanGain: K
          };
          const updated = [...prevData, newPt];
          if (updated.length > 50) {
            return updated.slice(updated.length - 50);
          }
          return updated;
        });

        return nextT;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, signalType, noiseVariance, qFactor, rFactor]);

  // Calculate real-time performance statistics
  const metrics = useMemo(() => {
    if (dataPoints.length < 5) return { rawRmse: 0, kalmanRmse: 0, noiseReduction: 0, avgGain: 0 };

    let rawSquareErrSum = 0;
    let kalmanSquareErrSum = 0;
    let gainSum = 0;

    dataPoints.forEach((pt) => {
      rawSquareErrSum += Math.pow(pt.noisySignal - pt.trueSignal, 2);
      kalmanSquareErrSum += Math.pow(pt.kalmanEstimate - pt.trueSignal, 2);
      gainSum += pt.kalmanGain;
    });

    const rawRmse = Math.sqrt(rawSquareErrSum / dataPoints.length);
    const kalmanRmse = Math.sqrt(kalmanSquareErrSum / dataPoints.length);
    const reduction = rawRmse > 0 ? Math.max(0, ((rawRmse - kalmanRmse) / rawRmse) * 100) : 0;

    return {
      rawRmse: rawRmse.toFixed(2),
      kalmanRmse: kalmanRmse.toFixed(2),
      noiseReduction: reduction.toFixed(1),
      avgGain: (gainSum / dataPoints.length).toFixed(3)
    };
  }, [dataPoints]);

  // SVG Chart Dimensions & Polyline calculations
  const svgWidth = 800;
  const svgHeight = 280;
  const yCenter = svgHeight / 2;
  const yScale = 30; // pixels per unit

  const pointsToSvgPath = (key: 'trueSignal' | 'noisySignal' | 'kalmanEstimate') => {
    if (dataPoints.length === 0) return '';
    return dataPoints
      .map((pt, i) => {
        const x = (i / Math.max(1, dataPoints.length - 1)) * svgWidth;
        const y = yCenter - pt[key] * yScale;
        return `${i === 0 ? 'M' : 'L'} ${x} ${Math.max(10, Math.min(svgHeight - 10, y))}`;
      })
      .join(' ');
  };

  return (
    <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive Graduate Research Demonstration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Stochastic Kalman Filter <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Live Lab</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Simulate real-time recursive state estimation from noisy sensor streams. Adjust variance, observe dynamic gain convergence, and verify error reduction.
        </p>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Stream' : 'Run Live'}</span>
            </button>

            <button
              onClick={handleReset}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                darkMode ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>

          {/* Waveform Selector */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['sine', 'harmonic', 'step', 'ramp'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSignalType(type);
                  handleReset();
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                  signalType === type
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
              <span className="text-emerald-400">Ground Truth x(t)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-400 inline-block border-t border-dashed" />
              <span className="text-rose-400">Raw Sensor z(t)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-cyan-400 inline-block rounded-full" />
              <span className="text-cyan-400 font-bold">Kalman Estimate x̂(t)</span>
            </div>
          </div>
        </div>

        {/* Live SVG Oscilloscope Waveform Canvas */}
        <div className={`mt-6 rounded-2xl border p-4 relative overflow-hidden ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          {/* Subtle oscilloscope grid lines */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full h-56 sm:h-72 transition-all relative z-10"
            preserveAspectRatio="none"
          >
            {/* Center zero line */}
            <line x1="0" y1={yCenter} x2={svgWidth} y2={yCenter} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

            {/* 1. Raw Noisy Observations (Red line) */}
            <path
              d={pointsToSvgPath('noisySignal')}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.2"
              opacity="0.65"
            />

            {/* 2. Ground Truth Hidden State (Green dashed line) */}
            <path
              d={pointsToSvgPath('trueSignal')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeDasharray="6 3"
              opacity="0.9"
            />

            {/* 3. Kalman Filtered Estimation (Cyan bold line) */}
            <path
              d={pointsToSvgPath('kalmanEstimate')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              className="transition-all duration-75"
            />
          </svg>

          {/* Real-time Indicator Tag */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Streaming Step #{timeStep}</span>
          </div>
        </div>

        {/* Real-time Engineering Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-xs text-slate-400 font-mono">Noise Reduction</p>
            <p className="text-2xl font-extrabold text-emerald-400">+{metrics.noiseReduction}%</p>
            <p className="text-[10px] text-slate-500">Filtered vs Raw Noise</p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-xs text-slate-400 font-mono">Kalman RMSE Error</p>
            <p className="text-2xl font-extrabold text-cyan-400">{metrics.kalmanRmse}</p>
            <p className="text-[10px] text-slate-500">Root Mean Square Error</p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-xs text-slate-400 font-mono">Raw Sensor RMSE</p>
            <p className="text-2xl font-extrabold text-rose-400">{metrics.rawRmse}</p>
            <p className="text-[10px] text-slate-500">Unfiltered Measurement Error</p>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-xs text-slate-400 font-mono">Avg Kalman Gain (K)</p>
            <p className="text-2xl font-extrabold text-indigo-400">{metrics.avgGain}</p>
            <p className="text-[10px] text-slate-500">Optimal Weight Balance</p>
          </div>
        </div>

        {/* Interactive Parameter Tuning Sliders */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-slate-800/40' : 'border-slate-200'} grid grid-cols-1 md:grid-cols-3 gap-6`}>
          {/* Slider 1: Sensor Noise Variance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Sensor Noise (R_true)</span>
              <span className="text-rose-400 font-bold">{noiseVariance.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="2.5"
              step="0.05"
              value={noiseVariance}
              onChange={(e) => setNoiseVariance(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-rose-500 ${
                darkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
            <p className="text-[11px] text-slate-500">Increases Gaussian variance added to the true signal.</p>
          </div>

          {/* Slider 2: Process Noise Covariance Q */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Process Covariance (Q)</span>
              <span className="text-cyan-400 font-bold">{qFactor.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.5"
              step="0.005"
              value={qFactor}
              onChange={(e) => setQFactor(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                darkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
            <p className="text-[11px] text-slate-500">Higher Q allows faster tracking of sharp transients.</p>
          </div>

          {/* Slider 3: Measurement Covariance R */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Measurement Covariance (R)</span>
              <span className="text-indigo-400 font-bold">{rFactor.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={rFactor}
              onChange={(e) => setRFactor(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                darkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
            <p className="text-[11px] text-slate-500">Higher R increases smoothing and suppresses noisy spikes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
