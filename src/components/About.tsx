import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award as AwardIcon, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  HeartHandshake,
  FileCheck,
  ExternalLink,
  Code2,
  Sliders
} from 'lucide-react';
import { 
  personalInfo, 
  educationData, 
  undergradEducationData,
  vtuTranscriptData,
  coursesDetails, 
  experiences, 
  awards 
} from '../data/portfolioData';
import { CourseDetail } from '../types';

interface AboutProps {
  darkMode: boolean;
  openCredentials: (tab?: 'resume' | 'transcript-vtu' | 'degree-wneu') => void;
}

export const About: React.FC<AboutProps> = ({ darkMode, openCredentials }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'experience' | 'coursework' | 'awards'>('experience');

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Professional Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Sagar Gurung</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          A dual-perspective engineer combining rigorous hardware/digital systems training with modern web technologies, systems integration, and statistical data methodologies.
        </p>
      </div>

      {/* Main Grid: Bio Card + Education Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Bio Card */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
          darkMode 
            ? 'bg-slate-900/60 border-slate-800 shadow-xl' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Engineering Philosophy</h3>
                <p className="text-xs font-mono text-slate-400">Systems Integration & Applied Theory</p>
              </div>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {personalInfo.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className={`p-3.5 rounded-xl border ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Hardware & Digital</span>
                </div>
                <p className="text-xs text-slate-400">VHDL RTL synthesis, ModelSim simulation, Xilinx ISE bitstreams, CMOS IC design.</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">Signals & Web</span>
                </div>
                <p className="text-xs text-slate-400">Kalman state estimation, stochastic analysis, React/TypeScript web management.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Location: {personalInfo.location}</span>
            </div>
            <button
              onClick={() => openCredentials('resume')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
            >
              <span>View Resume & Transcripts</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Dual Degree Education Card */}
        <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-5 ${
          darkMode 
            ? 'bg-gradient-to-b from-slate-900/90 to-slate-900/40 border-slate-800 shadow-xl' 
            : 'bg-gradient-to-b from-blue-50/50 to-white border-blue-100 shadow-sm'
        }`}>
          <div className="space-y-4">
            {/* Master's Degree Item */}
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  darkMode ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-blue-100 border-blue-200 text-blue-800'
                }`}>
                  Master of Science
                </span>
                <span className="text-[11px] font-mono text-slate-400">Conferred Dec 2023</span>
              </div>

              <h3 className="text-base font-bold tracking-tight">{educationData.degree}</h3>
              <p className="text-xs font-medium text-cyan-400 mb-2">{educationData.institution} — {educationData.location}</p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/40">
                <span className="font-mono text-slate-400">Cumulative GPA: <strong className="text-white text-sm">{educationData.gpa}</strong></span>
                <button
                  onClick={() => openCredentials('degree-wneu')}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bachelor's Degree Item (VTU) */}
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  darkMode ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-100 border-emerald-200 text-emerald-800'
                }`}>
                  Bachelor of Engineering
                </span>
                <span className="text-[11px] font-mono text-slate-400">Conferred July 2019</span>
              </div>

              <h3 className="text-base font-bold tracking-tight">{undergradEducationData.degree}</h3>
              <p className="text-xs font-medium text-indigo-400 mb-2">{undergradEducationData.institution} — Belagavi, India</p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/40">
                <span className="font-mono text-slate-400">USN: <strong className="text-indigo-300">{vtuTranscriptData.seatNumber}</strong> • CGPA: <strong className="text-white text-sm">{undergradEducationData.gpa}</strong></span>
                <button
                  onClick={() => openCredentials('transcript-vtu')}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                >
                  <span>View Transcript</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Honors: <span className="text-slate-200 font-medium">Dean's List</span> & <span className="text-slate-200 font-medium">First Class Distinction</span>.
            </p>
            <button
              onClick={() => openCredentials('transcript-vtu')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Full Transcript</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation for Experience, Coursework, and Awards */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl max-w-md mx-auto mb-10 border border-slate-800 bg-slate-900/60">
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'experience'
              ? darkMode
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience ({experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coursework')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'coursework'
              ? darkMode
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Coursework ({coursesDetails.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('awards')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'awards'
              ? darkMode
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AwardIcon className="w-4 h-4" />
          <span>Awards ({awards.length})</span>
        </button>
      </div>

      {/* Tab 1: Experience Timeline */}
      {activeTab === 'experience' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                darkMode 
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      exp.type === 'Work'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : exp.type === 'Academic'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold tracking-tight">{exp.role}</h4>
                  <p className="text-sm font-medium text-cyan-400 flex items-center gap-1.5 mt-0.5">
                    <span>{exp.company}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-normal">{exp.location}</span>
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-800/40">
                <span className="text-xs font-mono text-slate-400 mr-2">Key Areas:</span>
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Coursework Grid */}
      {activeTab === 'coursework' && (
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-mono text-slate-400 mb-6">
            Click on any course module to inspect covered analytical frameworks & simulation toolsets
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesDetails.map((course) => (
              <div
                key={course.code}
                id={`course-card-${course.code}`}
                onClick={() => setSelectedCourse(course)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  darkMode 
                    ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Master's Level</span>
                  </div>
                  <h4 className="font-bold text-base mb-2 leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4">{course.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.toolsUsed.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <span>View Syllabus Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Awards & Honors */}
      {activeTab === 'awards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {awards.map((award, idx) => (
            <div
              key={idx}
              id={`award-card-${idx}`}
              className={`p-6 rounded-2xl border flex items-start gap-4 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <AwardIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-amber-400 font-semibold">{award.year}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {award.badgeType}
                  </span>
                </div>
                <h4 className="font-bold text-base mb-1">{award.title}</h4>
                <p className="text-xs font-medium text-cyan-400 mb-2">{award.issuer}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`max-w-lg w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative animate-in fade-in zoom-in-95 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {selectedCourse.code}
              </span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white text-sm font-semibold p-1"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="text-xl font-bold mb-3">{selectedCourse.name}</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{selectedCourse.description}</p>

            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                  Key Topics & Mathematical Theories
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCourse.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                  Software, EDA & Simulation Packages
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.toolsUsed.map((tool, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-6 w-full py-2.5 rounded-xl font-semibold text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Back to Coursework Overview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
