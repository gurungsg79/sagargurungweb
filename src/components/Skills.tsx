import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Code2, 
  GitMerge, 
  Search, 
  Sparkles, 
  CheckCircle, 
  Terminal,
  Sliders,
  Layers
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

interface SkillsProps {
  darkMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-indigo-400" />;
      case 'GitMerge':
        return <GitMerge className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  const filteredCategories = skillCategories.map(cat => {
    const filteredSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.experience.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(cat => {
    if (selectedCategory !== 'all' && cat.title !== selectedCategory) return false;
    return cat.skills.length > 0;
  });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-blue-500/30 text-blue-400 bg-blue-500/10">
          <Terminal className="w-3.5 h-3.5" />
          <span>Technical Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Skills & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Engineering Stack</span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          A cross-disciplinary toolkit spanning hardware description languages, stochastic algorithms, EDA simulation suites, and full-stack web engineering.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedCategory === 'all'
                ? darkMode
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-blue-600 text-white border-blue-600'
                : darkMode
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.title
                  ? darkMode
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-blue-600 text-white border-blue-600'
                  : darkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g., VHDL, Kalman, React)..."
            className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' 
                : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredCategories.map((category) => (
          <div
            key={category.title}
            className={`p-6 sm:p-7 rounded-3xl border transition-all ${
              darkMode 
                ? 'bg-slate-900/60 border-slate-800 shadow-xl' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/40">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                {getCategoryIcon(category.iconName)}
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{category.title}</h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {category.skills.length} core technical domains
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        darkMode ? 'bg-slate-950 text-cyan-400 border border-slate-800' : 'bg-slate-100 text-blue-700'
                      }`}>
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{skill.experience}</span>
                  </div>

                  {/* Progress Meter */}
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Certifications Callout */}
      <div className={`mt-10 p-6 rounded-2xl border max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">MATLAB Certified – Advanced Level (2023)</h4>
            <p className="text-xs text-slate-400">Formal verification in complex state-space modeling, stochastic signal simulation, and algorithm optimization.</p>
          </div>
        </div>
        <a
          href="#projects"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shrink-0"
        >
          See Applied In Projects
        </a>
      </div>
    </section>
  );
};
