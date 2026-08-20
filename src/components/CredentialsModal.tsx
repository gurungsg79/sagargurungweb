import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Copy, 
  Check, 
  X, 
  Award, 
  ShieldCheck, 
  Building2, 
  Send,
  Sparkles,
  Lock,
  Mail
} from 'lucide-react';
import { 
  personalInfo, 
  educationData, 
  undergradEducationData, 
  vtuTranscriptData, 
  coursesDetails, 
  experiences, 
  projects 
} from '../data/portfolioData';

export type CredentialsTab = 'resume' | 'transcript-vtu' | 'degree-wneu';

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  initialTab?: CredentialsTab;
  onRequestInquiry?: (subject: string, messageTemplate: string) => void;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  initialTab = 'resume',
  onRequestInquiry
}) => {
  const [activeTab, setActiveTab] = useState<CredentialsTab>(initialTab);
  const [copiedText, setCopiedText] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');

  // Sync tab if initialTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Keyboard shortcut ESC to close
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

  const handleRequestDocument = (docName: string, defaultSubject: string, specificDetails: string) => {
    if (onRequestInquiry) {
      const template = `Hello Sagar,\n\nI am reviewing your professional portfolio and would like to request an official verified copy of your ${docName}.\n\nPurpose / Details: ${specificDetails}\n\nPlease send the verified file to my email. Thank you!`;
      onRequestInquiry(defaultSubject, template);
    } else {
      onClose();
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Plaintext Resume generator for ATS text scrapers
  const rawResumeText = `
SAGAR GURUNG
Electrical Engineering Graduate & Web Systems Specialist
Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

PROFESSIONAL SUMMARY
${personalInfo.summary}

EDUCATION
1. ${educationData.degree}
   ${educationData.institution} — ${educationData.location}
   Conferred: ${educationData.period} | Cumulative GPA: ${educationData.gpa}
   Honors: ${educationData.honors.join('; ')}

2. ${undergradEducationData.degree}
   ${undergradEducationData.institution} — ${undergradEducationData.location}
   Conferred: ${undergradEducationData.period} | CGPA: ${undergradEducationData.gpa}
   Distinction: First Class | University Seat No: ${vtuTranscriptData.seatNumber}

RELEVANT GRADUATE & UNDERGRADUATE COURSEWORK
${educationData.relevantCourses.map(c => `• ${c}`).join('\n')}
${undergradEducationData.relevantCourses.map(c => `• ${c}`).join('\n')}

TECHNICAL SKILLS
• Hardware & RTL Design: VHDL, RTL Synthesis, ModelSim, Xilinx ISE, Cadence, CMOS IC Design
• Signal Processing & Control: Kalman Filtering, Stochastic Processes, DSP, MATLAB/Simulink (Certified)
• Software & Web: Python (NumPy, SciPy, Pandas), C/C++, JavaScript, TypeScript, React, Tailwind CSS
• Systems & Quality: Hardware-in-the-Loop Integration, Statistical Quality Control (SQC/SPC), LabVIEW

ENGINEERING PROJECTS
${projects.map(p => `• ${p.title} (${p.period})\n  ${p.shortDescription}\n  Highlights: ${p.highlights.join('; ')}`).join('\n\n')}

EXPERIENCE
${experiences.map(e => `• ${e.role} — ${e.company} (${e.period})\n  ${e.bullets.join('\n  ')}`).join('\n\n')}
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Filter semesters for VTU transcript
  const filteredSemesters = selectedSemester === 'all'
    ? vtuTranscriptData.semesters
    : vtuTranscriptData.semesters.filter(s => s.roman === selectedSemester);

  const totalUndergradCredits = vtuTranscriptData.semesters.reduce((acc, sem) => 
    acc + sem.courses.reduce((cAcc, c) => cAcc + c.credits, 0), 0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        id="credentials-modal-container"
        className={`max-w-5xl w-full my-4 rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col max-h-[94vh] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header Bar */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-800/40 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-tight">Resume & Transcripts Portal</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Records
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Sagar Gurung • MS in Electrical Engineering (WNEU) & BE in ECE (VTU)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRequestDocument(
                activeTab === 'resume' ? 'Official Resume / CV' : activeTab === 'transcript-vtu' ? 'VTU Academic Transcript (B.E.)' : 'WNEU Master\'s Record (M.S.)',
                activeTab === 'resume' ? 'Official Document Request: Comprehensive Engineering Resume (ATS / PDF)' : activeTab === 'transcript-vtu' ? 'Official Document Request: VTU Academic Transcript (B.E.)' : 'Official Document Request: WNEU Graduate Record (M.S.)',
                'Employment background check / formal interview evaluation'
              )}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-sm transition-all"
              title="Request Official Verified Copy via Inquiry"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request Official Copy</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Header */}
        <div className="no-print flex items-center gap-1 p-2 border-b border-slate-800/40 bg-slate-950/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'resume'
                ? darkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curriculum Vitae / Resume</span>
          </button>

          <button
            onClick={() => setActiveTab('transcript-vtu')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'transcript-vtu'
                ? darkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>VTU Official Transcript (B.E.)</span>
          </button>

          <button
            onClick={() => setActiveTab('degree-wneu')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'degree-wneu'
                ? darkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>WNEU Master's Record (M.S.)</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 space-y-6">

          {/* TAB 1: ATS RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              {/* Inquiry Request Bar */}
              <div className="no-print p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Need an Official PDF or Verified Resume?</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Direct downloads are disabled for document integrity. Request a personalized copy delivered to your email.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyText}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied ATS Text' : 'Copy ATS Text'}</span>
                  </button>

                  <button
                    onClick={() => handleRequestDocument(
                      'Comprehensive Engineering Resume (ATS / PDF)',
                      'Official Document Request: Comprehensive Engineering Resume (ATS / PDF)',
                      'Engineering recruitment review / candidate evaluation'
                    )}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Official Resume</span>
                  </button>
                </div>
              </div>

              {/* Verified Resume Paper */}
              <div className="p-6 sm:p-10 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-300 font-sans space-y-6 leading-relaxed">
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 text-center">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                    {personalInfo.name}
                  </h1>
                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    Electrical Engineering Graduate • Systems & Web Specialist
                  </p>
                  <p className="text-xs text-slate-600 mt-1 flex flex-wrap justify-center items-center gap-2 font-mono">
                    <span>{personalInfo.location}</span>
                    <span>•</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">{personalInfo.email}</a>
                    <span>•</span>
                    <span>{personalInfo.phone}</span>
                    <span>•</span>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
                    <span>•</span>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>
                  </p>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs font-extrabold font-mono tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-800 text-justify leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-extrabold font-mono tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
                    Education & Degrees
                  </h2>
                  <div className="space-y-3">
                    {/* Master's */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                        <strong className="text-sm font-bold text-slate-900">{educationData.degree}</strong>
                        <span className="font-mono text-slate-600 font-semibold">{educationData.period}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 mt-0.5">
                        <span className="font-semibold text-blue-900">{educationData.institution} — {educationData.location}</span>
                        <span className="font-mono font-bold">GPA: {educationData.gpa}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic mt-0.5">
                        Honors: {educationData.honors.join(' • ')}
                      </p>
                    </div>

                    {/* Undergrad */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                        <strong className="text-sm font-bold text-slate-900">{undergradEducationData.degree}</strong>
                        <span className="font-mono text-slate-600 font-semibold">{undergradEducationData.period}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 mt-0.5">
                        <span className="font-semibold text-blue-900">{undergradEducationData.institution} — {undergradEducationData.location}</span>
                        <span className="font-mono font-bold">CGPA: {undergradEducationData.gpa}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic mt-0.5">
                        Distinction: First Class • USN: {vtuTranscriptData.seatNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h2 className="text-xs font-extrabold font-mono tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Core Competencies & Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-800">
                    <div>
                      <strong className="text-slate-900">Digital Systems & RTL:</strong> VHDL, FPGA, RTL Synthesis, ModelSim, Xilinx Vivado, CMOS IC Design.
                    </div>
                    <div>
                      <strong className="text-slate-900">Control & Signal Processing:</strong> Kalman Filtering, Stochastic Modeling, MATLAB/Simulink (Certified), DSP.
                    </div>
                    <div>
                      <strong className="text-slate-900">Programming & Software:</strong> Python (NumPy, SciPy), C/C++, JavaScript, TypeScript, React, Tailwind CSS.
                    </div>
                    <div>
                      <strong className="text-slate-900">Systems & Quality:</strong> Hardware-in-the-Loop (HIL), Statistical Quality Control (SQC/SPC), Git, Linux.
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xs font-extrabold font-mono tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
                    Professional & Academic Experience
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp, i) => (
                      <div key={i}>
                        <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                          <strong className="font-bold text-slate-900 text-xs sm:text-sm">{exp.role}</strong>
                          <span className="font-mono text-slate-600">{exp.period}</span>
                        </div>
                        <p className="text-xs font-semibold text-blue-900 mb-1">{exp.company} • {exp.location}</p>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-snug">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Projects */}
                <div>
                  <h2 className="text-xs font-extrabold font-mono tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
                    Selected Engineering Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <strong className="font-bold text-slate-900">{proj.title}</strong>
                          <span className="font-mono text-slate-600 text-[11px]">{proj.period}</span>
                        </div>
                        <p className="text-slate-700 text-xs mt-0.5">{proj.shortDescription}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Technologies: {proj.tools.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VTU BACHELOR TRANSCRIPT */}
          {activeTab === 'transcript-vtu' && (
            <div className="space-y-6">
              {/* Transcript Metadata & Request Toolbar */}
              <div className="no-print p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <h4 className="font-bold text-sm text-white">Official VTU Academic Transcript</h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    USN: <span className="font-mono text-indigo-300 font-semibold">{vtuTranscriptData.seatNumber}</span> • Sealed transcript copies provided on request.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Filter by Semester */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300 font-mono">Filter:</span>
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="all">All 8 Semesters</option>
                      {vtuTranscriptData.semesters.map((s) => (
                        <option key={s.roman} value={s.roman}>
                          Semester {s.roman}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleRequestDocument(
                      'VTU Official Academic Transcript (B.E. in Electronics & Communication)',
                      'Official Document Request: VTU Academic Transcript (B.E.)',
                      'Undergraduate credential verification and sealed transcript request'
                    )}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Official Transcript</span>
                  </button>
                </div>
              </div>

              {/* Statistics Highlights */}
              <div className="no-print grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Degree Class</p>
                  <p className="text-sm sm:text-base font-bold text-emerald-400">{vtuTranscriptData.classOfDegree}</p>
                </div>
                <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Cumulative CGPA</p>
                  <p className="text-sm sm:text-base font-bold text-white">{vtuTranscriptData.cgpa} / 10.00</p>
                </div>
                <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Total Earned Credits</p>
                  <p className="text-sm sm:text-base font-bold text-cyan-400">{totalUndergradCredits} Credits</p>
                </div>
                <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Percentage Equivalent</p>
                  <p className="text-sm sm:text-base font-bold text-indigo-300">{vtuTranscriptData.percentage}</p>
                </div>
              </div>

              {/* Printable Transcript Document Paper */}
              <div className="p-6 sm:p-10 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-300 font-sans">
                {/* Official University Header */}
                <div className="text-center pb-5 border-b-2 border-slate-900">
                  <h2 className="text-lg sm:text-2xl font-serif font-black tracking-wide text-slate-900 uppercase">
                    Visvesvaraya Technological University, Belagavi
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-700 uppercase">
                    Karnataka State, INDIA
                  </p>
                  <div className="inline-block mt-3 px-4 py-1 border border-slate-900 font-mono text-xs font-extrabold uppercase tracking-widest bg-slate-100">
                    TRANSCRIPT AS PER RECORDS
                  </div>
                </div>

                {/* Candidate & Degree Info Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-slate-300 text-xs">
                  <div className="space-y-1.5">
                    <p><strong className="font-semibold text-slate-800">Candidate Name:</strong> <span className="font-bold text-slate-950 uppercase">{vtuTranscriptData.name}</span></p>
                    <p><strong className="font-semibold text-slate-800">University Seat No (USN):</strong> <span className="font-mono font-bold text-indigo-900">{vtuTranscriptData.seatNumber}</span></p>
                    <p><strong className="font-semibold text-slate-800">Year of Admission:</strong> <span className="font-mono">{vtuTranscriptData.admissionYear}</span></p>
                    <p><strong className="font-semibold text-slate-800">Mon & Yr. of Completion:</strong> <span className="font-mono">{vtuTranscriptData.completionMonthYear}</span></p>
                    <p><strong className="font-semibold text-slate-800">Academic Program:</strong> <span className="font-bold">{vtuTranscriptData.academicProgram}</span></p>
                  </div>

                  <div className="space-y-1.5 md:border-l md:border-slate-200 md:pl-4">
                    <p><strong className="font-semibold text-slate-800">1. Duration of the Course:</strong> 4 Years (8 Semesters)</p>
                    <p><strong className="font-semibold text-slate-800">2. Medium of Instructions:</strong> English (Certified)</p>
                    <p><strong className="font-semibold text-slate-800">3. Formula:</strong> Percentage = (CGPA - 0.75) * 10</p>
                    <p><strong className="font-semibold text-slate-800">4. Class of Degree:</strong> <span className="font-bold text-emerald-800">First Class (FC)</span></p>
                    <p><strong className="font-semibold text-slate-800">5. Cumulative CGPA:</strong> <span className="text-base font-extrabold text-slate-950">{vtuTranscriptData.cgpa} / 10.00</span> (65.10%)</p>
                  </div>
                </div>

                {/* Semesters Grades Tables */}
                <div className="py-4 space-y-6">
                  {filteredSemesters.map((sem) => (
                    <div key={sem.roman} className="border border-slate-300 rounded-lg overflow-hidden">
                      <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-bold text-slate-900">
                        <span className="uppercase tracking-wider">{sem.semester}</span>
                        <span className="font-mono text-slate-600 font-normal">Exam Session: {sem.examMonthYear}</span>
                      </div>

                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                            <th className="p-2 font-mono font-semibold w-24">Course Code</th>
                            <th className="p-2 font-semibold">Course Name</th>
                            <th className="p-2 font-semibold text-center w-16">Credits</th>
                            <th className="p-2 font-semibold text-center w-16">Grade</th>
                            <th className="p-2 font-semibold text-center w-20">Attempts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map((course, cIdx) => (
                            <tr key={cIdx} className="border-b border-slate-100 hover:bg-slate-50/80">
                              <td className="p-2 font-mono font-bold text-slate-800">{course.code}</td>
                              <td className="p-2 font-medium text-slate-900">{course.name}</td>
                              <td className="p-2 text-center font-mono text-slate-700">{course.credits}</td>
                              <td className="p-2 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                                  course.grade.startsWith('S')
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : course.grade === 'A'
                                      ? 'bg-blue-100 text-blue-800'
                                      : course.grade === 'B'
                                        ? 'bg-cyan-100 text-cyan-800'
                                        : 'bg-slate-100 text-slate-800'
                                }`}>
                                  {course.grade}
                                </span>
                              </td>
                              <td className="p-2 text-center font-mono text-slate-600">{course.attempts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>

                {/* Official Grading Scheme & Conversion Scale */}
                <div className="pt-4 mt-4 border-t border-slate-300 text-[11px] text-slate-700 space-y-3">
                  <p className="font-bold text-slate-900 uppercase">Grading Scale & Grade Points:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse border border-slate-300 text-[10px]">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-1">Grade</th>
                          <th className="border border-slate-300 p-1">S+</th>
                          <th className="border border-slate-300 p-1">S</th>
                          <th className="border border-slate-300 p-1">A</th>
                          <th className="border border-slate-300 p-1">B</th>
                          <th className="border border-slate-300 p-1">C</th>
                          <th className="border border-slate-300 p-1">D</th>
                          <th className="border border-slate-300 p-1">E</th>
                          <th className="border border-slate-300 p-1">F</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-1 font-bold bg-slate-50">Grade Point</td>
                          <td className="border border-slate-300 p-1 font-bold">10</td>
                          <td className="border border-slate-300 p-1 font-bold">9</td>
                          <td className="border border-slate-300 p-1 font-bold">8</td>
                          <td className="border border-slate-300 p-1 font-bold">7</td>
                          <td className="border border-slate-300 p-1 font-bold">6</td>
                          <td className="border border-slate-300 p-1 font-bold">5</td>
                          <td className="border border-slate-300 p-1 font-bold">4</td>
                          <td className="border border-slate-300 p-1 font-bold">0</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-1 font-bold bg-slate-50">Marks Range</td>
                          <td className="border border-slate-300 p-1">&gt;= 90</td>
                          <td className="border border-slate-300 p-1">&lt;90, &gt;=80</td>
                          <td className="border border-slate-300 p-1">&lt;80, &gt;=70</td>
                          <td className="border border-slate-300 p-1">&lt;70, &gt;=60</td>
                          <td className="border border-slate-300 p-1">&lt;60, &gt;=50</td>
                          <td className="border border-slate-300 p-1">&lt;50, &gt;=45</td>
                          <td className="border border-slate-300 p-1">&lt;45, &gt;=40</td>
                          <td className="border border-slate-300 p-1">&lt; 40</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 text-xs font-mono text-slate-600">
                    <span>* PP = Mandatory Non-Credit Course Pass</span>
                    <span className="font-bold text-slate-900">AUTHENTICATED TRANSCRIPT RECORD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WNEU MASTER'S RECORD */}
          {activeTab === 'degree-wneu' && (
            <div className="space-y-6">
              {/* Inquiry Request Bar */}
              <div className="no-print p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-sm text-white">Western New England University Graduate Records</h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Master of Science in Electrical Engineering • GPA 3.19 • Dean's List Honor
                  </p>
                </div>

                <button
                  onClick={() => handleRequestDocument(
                    'WNEU Master\'s Degree Verification and Graduate Coursework Record',
                    'Official Document Request: WNEU Graduate Record (M.S.)',
                    'Graduate degree verification and academic syllabus review'
                  )}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Graduate Record</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Master of Science (Graduate Degree)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-2">{educationData.degree}</h3>
                    <p className="text-sm font-medium text-cyan-400">{educationData.institution} — {educationData.location}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 text-right">
                    <p className="text-xs text-slate-400 font-mono">Graduate GPA</p>
                    <p className="text-2xl font-extrabold text-white">{educationData.gpa}</p>
                    <p className="text-[11px] text-slate-400">Conferred: Dec 2023</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                    Graduate Honors & Distinctions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {educationData.honors.map((h, i) => (
                      <div key={i} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graduate Coursework Syllabus Details */}
                <div className="space-y-4">
                  <p className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                    Curriculum & Specialized Engineering Courses ({coursesDetails.length})
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coursesDetails.map((course) => (
                      <div 
                        key={course.code}
                        className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-2 hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            {course.code}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Graduate Level</span>
                        </div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-200">{course.name}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{course.description}</p>
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {course.toolsUsed.map((tool, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Status Bar */}
        <div className="no-print p-3.5 border-t border-slate-800/60 bg-slate-950/90 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Document Security: Direct download protected. Use "Request Official Copy" to receive verified files.</span>
          </div>
          <span className="text-slate-500 font-sans">Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
