export interface Project {
  id: string;
  title: string;
  category: 'digital-systems' | 'signal-processing' | 'systems-integration' | 'web-management' | 'fpga-dsp';
  categoryLabel: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  tools: string[];
  featured?: boolean;
  architectureDiagram?: string;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  metrics?: { label: string; value: string }[];
  liveDemoType?: 'kalman' | 'vhdl' | 'telemetry';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Work' | 'Academic' | 'Volunteer';
  bullets: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  graduationDate?: string;
  gpa: string;
  honors: string[];
  relevantCourses: string[];
}

export interface CourseDetail {
  code: string;
  name: string;
  description: string;
  keyTopics: string[];
  toolsUsed: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    category: string;
    experience: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  tableOfContents: string[];
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description: string;
  badgeType: 'award' | 'certification' | 'scholarship';
}

export interface HostingGuideStep {
  platform: string;
  title: string;
  description: string;
  steps: string[];
  commands?: string[];
  configSnippet?: string;
}

export interface TranscriptCourse {
  code: string;
  name: string;
  credits: number;
  grade: string;
  attempts: number;
}

export interface TranscriptSemester {
  semester: string;
  roman: string;
  examMonthYear: string;
  courses: TranscriptCourse[];
}

export interface VTUTranscript {
  name: string;
  seatNumber: string;
  admissionYear: string;
  completionMonthYear: string;
  academicProgram: string;
  institution: string;
  stateCountry: string;
  duration: string;
  mediumOfInstruction: string;
  cgpa: string;
  percentage: string;
  classOfDegree: string;
  semesters: TranscriptSemester[];
}

export interface UploadedDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  dataUrl?: string;
  uploadedAt: string;
  category: 'Transcript' | 'Resume' | 'Certificate' | 'Degree' | 'Other';
  description?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

