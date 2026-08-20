import { Project, Experience, Education, CourseDetail, SkillCategory, BlogPost, Award, HostingGuideStep, VTUTranscript } from '../types';

export const personalInfo = {
  name: "Sagar Gurung",
  role: "Electrical Engineering Graduate & Web Systems Specialist",
  tagline: "Bridging Digital Systems, Stochastic Signal Processing & Modern Web Architectures",
  email: "gurung.sg79@gmail.com",
  phone: "+1 (413) 276-8500",
  location: "New Jersey, NJ 07666",
  availability: "Open to Full-time Opportunities & Technical Inquiries",
  linkedin: "https://www.linkedin.com/in/gurung-sagar-b09171416/",
  github: "https://github.com/gurungsg79",
  university: "Western New England University in Springfield, Massachusetts",
  degree: "Master of Science in Electrical Engineering",
  gpa: "3.19",
  graduationDate: "December 2023",
  summary: `Motivated and results-driven Electrical Engineering graduate with a Master of Science from Western New England University in Springfield, Massachusetts and a Bachelor of Engineering in Electronics and Communication from Visvesvaraya Technological University in Belagavi, India (First Class Distinction). I specialize in systems integration, VHDL digital design, stochastic processes, and high-performance digital architectures.`
};

export const stats = [
  { label: "Master's Degree", value: "3.19 GPA", subtext: "Western New England Univ., Springfield, MA" },
  { label: "Bachelor's Degree", value: "7.26 CGPA", subtext: "VTU Belagavi, India (First Class)" },
  { label: "Engineering Projects", value: "5+", subtext: "VHDL, Kalman Filter, Systems" },
  { label: "Industry & Academic Exp.", value: "2.5+ Yrs", subtext: "Takeo.ai & WNEU GTA" }
];

export const educationData: Education = {
  degree: "Master of Science in Electrical Engineering",
  institution: "Western New England University",
  location: "Springfield, Massachusetts",
  period: "2021 – December 2023",
  gpa: "3.19 / 4.00",
  honors: [
    "Dean's List (Spring 2023, Fall 2023)",
    "Academic Excellence Scholarship (2021 – 2023)",
    "IEEE Student Member (2021 – 2023)"
  ],
  relevantCourses: [
    "Linear and Nonlinear Systems Modeling & Simulation",
    "Stochastic Processes & Kalman Filtering",
    "Advanced Electrical Engineering Analysis",
    "VHDL: Simulation & Synthesis",
    "Design of Digital Integrated Circuits",
    "Statistical Quality Control",
    "Systems Integration",
    "Security Engineering"
  ]
};

export const undergradEducationData: Education = {
  degree: "Bachelor of Engineering in Electronics and Communication",
  institution: "Visvesvaraya Technological University",
  location: "Belagavi, India",
  period: "2015 – July 2019",
  gpa: "7.26 / 10.00 (65.10%)",
  honors: [
    "Awarded First Class Degree Distinction",
    "University Seat Number (USN): 1EW15EC126",
    "Medium of Instruction: English (Certified)"
  ],
  relevantCourses: [
    "Digital Signal Processing & DSP Lab",
    "Verilog HDL & HDL Lab",
    "ARM Microcontroller & Embedded Systems",
    "VLSI Design & VLSI Lab",
    "Computer Communication Networks",
    "Wireless Cellular & LTE 4G Broadband",
    "Fiber Optics & Networks",
    "Network and Cyber Security",
    "Real Time Systems & Operating Systems"
  ]
};

export const vtuTranscriptData: VTUTranscript = {
  name: "SAGAR GURUNG",
  seatNumber: "1EW15EC126",
  admissionYear: "2015",
  completionMonthYear: "07/2019 (July 2019)",
  academicProgram: "Bachelor of Engineering (Electronics & Communication Engineering)",
  institution: "Visvesvaraya Technological University (VTU)",
  stateCountry: "Belagavi, Karnataka State, INDIA",
  duration: "4 Years (8 Semesters)",
  mediumOfInstruction: "English",
  cgpa: "7.26",
  percentage: "65.10%",
  classOfDegree: "First Class",
  semesters: [
    {
      semester: "I Semester",
      roman: "I",
      examMonthYear: "01/2016",
      courses: [
        { code: "15MAT11", name: "Engineering Maths-I", credits: 4, grade: "A", attempts: 1 },
        { code: "15CHE12", name: "Engineering Chemistry", credits: 4, grade: "E", attempts: 1 },
        { code: "15PCD13", name: "Programming in C & Data Structures", credits: 4, grade: "B", attempts: 1 },
        { code: "15CED14", name: "Computer Aided Engineering Drawing", credits: 4, grade: "S", attempts: 1 },
        { code: "15ELN15", name: "Basic Electronics", credits: 4, grade: "B", attempts: 1 },
        { code: "15CPL16", name: "Computer Programming Lab", credits: 2, grade: "S", attempts: 1 },
        { code: "15CHEL17", name: "Engineering Chemistry Lab", credits: 2, grade: "S", attempts: 1 },
        { code: "15CIV18", name: "Environmental Studies", credits: 0, grade: "PP", attempts: 1 }
      ]
    },
    {
      semester: "II Semester",
      roman: "II",
      examMonthYear: "07/2016",
      courses: [
        { code: "15MAT21", name: "Engineering Maths-II", credits: 4, grade: "B", attempts: 1 },
        { code: "15PHY22", name: "Engineering Physics", credits: 4, grade: "S", attempts: 1 },
        { code: "15CIV23", name: "Elements of Civil Engg. & Mechanics", credits: 4, grade: "B", attempts: 1 },
        { code: "15EME24", name: "Elements of Mechanical Engineering", credits: 4, grade: "B", attempts: 1 },
        { code: "15ELE25", name: "Basic Electrical Engineering", credits: 4, grade: "B", attempts: 1 },
        { code: "15WSL26", name: "Workshop Practice", credits: 2, grade: "S", attempts: 1 },
        { code: "15PHYL27", name: "Engg. Physics Lab", credits: 2, grade: "A", attempts: 1 },
        { code: "15CPH28", name: "Const. of India, Prof. Ethics & Human Rights", credits: 0, grade: "PP", attempts: 1 }
      ]
    },
    {
      semester: "III Semester",
      roman: "III",
      examMonthYear: "04/2017",
      courses: [
        { code: "15MAT31", name: "Engineering Mathematics - III", credits: 4, grade: "A", attempts: 1 },
        { code: "15EC32", name: "Analog Electronics", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC33", name: "Digital Electronics", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC34", name: "Network Analysis", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC35", name: "Electronic Instrumentation", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC36", name: "Engineering Electromagnetics", credits: 4, grade: "C", attempts: 1 },
        { code: "15ECL37", name: "Analog Electronics Lab", credits: 2, grade: "S", attempts: 1 },
        { code: "15ECL38", name: "Digital Electronics Lab", credits: 2, grade: "S", attempts: 1 }
      ]
    },
    {
      semester: "IV Semester",
      roman: "IV",
      examMonthYear: "07/2017",
      courses: [
        { code: "15MAT41", name: "Engineering Mathematics-IV", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC42", name: "Microprocessor", credits: 4, grade: "E", attempts: 1 },
        { code: "15EC43", name: "Control Systems", credits: 4, grade: "C", attempts: 1 },
        { code: "15EC44", name: "Signals and Systems", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC45", name: "Principles of Communication Systems", credits: 4, grade: "E", attempts: 1 },
        { code: "15EC46", name: "Linear Integrated Circuits", credits: 4, grade: "D", attempts: 1 },
        { code: "15ECL47", name: "Microprocessor Lab", credits: 2, grade: "D", attempts: 1 },
        { code: "15ECL48", name: "Linear ICs and Communication Lab", credits: 2, grade: "S+", attempts: 1 }
      ]
    },
    {
      semester: "V Semester",
      roman: "V",
      examMonthYear: "01/2018",
      courses: [
        { code: "15ES51", name: "Management & Entrepreneurship Development", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC52", name: "Digital Signal Processing", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC53", name: "Verilog HDL", credits: 4, grade: "A", attempts: 1 },
        { code: "15EC54", name: "Information Theory and Coding", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC553", name: "Operating System", credits: 3, grade: "C", attempts: 1 },
        { code: "15EC562", name: "Object Oriented Programming Using C++", credits: 3, grade: "B", attempts: 1 },
        { code: "15ECL57", name: "DSP Lab", credits: 2, grade: "S", attempts: 1 },
        { code: "15ECL58", name: "HDL Lab", credits: 2, grade: "S+", attempts: 1 }
      ]
    },
    {
      semester: "VI Semester",
      roman: "VI",
      examMonthYear: "07/2018",
      courses: [
        { code: "15EC61", name: "Digital Communication", credits: 4, grade: "C", attempts: 1 },
        { code: "15EC62", name: "ARM Microcontroller & Embedded Systems", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC63", name: "VLSI Design", credits: 4, grade: "E", attempts: 1 },
        { code: "15EC64", name: "Computer Communication Networks", credits: 4, grade: "A", attempts: 1 },
        { code: "15EC654", name: "Digital Switching Systems", credits: 3, grade: "B", attempts: 1 },
        { code: "15EC663", name: "Digital System Design using Verilog", credits: 3, grade: "B", attempts: 1 },
        { code: "15ECL67", name: "Embedded Controller Lab", credits: 2, grade: "S+", attempts: 1 },
        { code: "15ECL68", name: "Computer Networks Lab", credits: 2, grade: "B", attempts: 1 }
      ]
    },
    {
      semester: "VII Semester",
      roman: "VII",
      examMonthYear: "01/2019",
      courses: [
        { code: "15EC71", name: "Microwave and Antennas", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC72", name: "Digital Image Processing", credits: 4, grade: "B", attempts: 1 },
        { code: "15EC73", name: "Power Electronics", credits: 4, grade: "C", attempts: 1 },
        { code: "15EC743", name: "Real Time Systems", credits: 3, grade: "B", attempts: 1 },
        { code: "15EC751", name: "DSP Algorithms and Architecture", credits: 3, grade: "B", attempts: 1 },
        { code: "15ECL76", name: "Advanced Communication Lab", credits: 2, grade: "A", attempts: 1 },
        { code: "15ECL77", name: "VLSI Lab", credits: 2, grade: "S+", attempts: 1 },
        { code: "15ECP78", name: "Project Phase -I + Seminar", credits: 2, grade: "S+", attempts: 1 }
      ]
    },
    {
      semester: "VIII Semester",
      roman: "VIII",
      examMonthYear: "07/2019",
      courses: [
        { code: "15EC81", name: "Wireless Cellular and LTE 4G Broadband", credits: 4, grade: "A", attempts: 1 },
        { code: "15EC82", name: "Fiber Optics & Networks", credits: 4, grade: "A", attempts: 1 },
        { code: "15EC835", name: "Network and Cyber Security", credits: 3, grade: "D", attempts: 1 },
        { code: "15EC84", name: "Internship/Professional Practice", credits: 2, grade: "S+", attempts: 1 },
        { code: "15ECP85", name: "Project Work", credits: 6, grade: "S+", attempts: 1 },
        { code: "15ECS86", name: "Seminar", credits: 1, grade: "S+", attempts: 1 }
      ]
    }
  ]
};


export const coursesDetails: CourseDetail[] = [
  {
    code: "EE-601",
    name: "Linear and Nonlinear Systems Modeling & Simulation",
    description: "Mathematical state-space modeling, linearization techniques, phase-plane analysis, and multi-domain physical simulation using MATLAB/Simulink.",
    keyTopics: ["State-Space Representations", "Lyapunov Stability", "Nonlinear Perturbations", "Transfer Function Synthesis"],
    toolsUsed: ["MATLAB", "Simulink", "Stateflow"]
  },
  {
    code: "EE-620",
    name: "Stochastic Processes & Kalman Filtering",
    description: "Probabilistic random variables, Markov chains, power spectral density, Wiener filtering, and discrete/continuous Kalman Filter algorithms for noisy sensor estimation.",
    keyTopics: ["Covariance Propagation", "State Estimation", "Innovation Updates", "Extended Kalman Filtering (EKF)"],
    toolsUsed: ["MATLAB", "Python (NumPy/SciPy)", "C++"]
  },
  {
    code: "EE-640",
    name: "VHDL: Simulation & Synthesis",
    description: "Register Transfer Level (RTL) hardware description, behavioral & structural modeling, finite state machines (FSM), timing constraints, and FPGA synthesis.",
    keyTopics: ["RTL Architecture", "Moore & Mealy FSMs", "Testbench Verification", "Static Timing Analysis"],
    toolsUsed: ["ModelSim", "Xilinx ISE", "Vivado"]
  },
  {
    code: "EE-645",
    name: "Design of Digital Integrated Circuits",
    description: "CMOS logic design, transistor-level parasitics, propagation delay, low-power digital architecture, and layout synthesis.",
    keyTopics: ["CMOS Inverters & Gates", "Dynamic Power Dissipation", "Clock Tree Synthesis", "Cadence DRC/LVS"],
    toolsUsed: ["Cadence Virtuoso", "NI Multisim", "SPICE"]
  },
  {
    code: "IE-610",
    name: "Statistical Quality Control",
    description: "Statistical process control (SPC), Shewhart control charts, process capability indices (Cp, Cpk), acceptance sampling, and Six Sigma methodology.",
    keyTopics: ["X-bar & R Charts", "Process Capability (Cpk)", "ANOVA & Design of Experiments", "Pareto Analysis"],
    toolsUsed: ["Minitab", "Python Pandas", "R"]
  },
  {
    code: "EE-670",
    name: "Systems Integration & Security Engineering",
    description: "End-to-end hardware-software integration, interface protocol definition (UART, SPI, I2C, CAN, Ethernet), fault-tolerant architectures, and embedded security.",
    keyTopics: ["Hardware-in-the-Loop (HIL)", "Bus Interoperability", "Threat Modeling", "Fault Tree Analysis"],
    toolsUsed: ["LabVIEW", "Wireshark", "C++", "Python"]
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-takeo",
    role: "Intern – Electrical Engineering",
    company: "Takeo.ai",
    location: "Remote / Hybrid",
    period: "February 2024 – February 2025",
    type: "Work",
    bullets: [
      "Collaborated with senior engineers in the design, simulation, and testing of electrical systems for industrial applications.",
      "Analyzed complex circuit behavior using simulation tools and contributed to the preparation of technical documentation for ongoing projects.",
      "Performed comprehensive system testing and empirical analysis to identify design flaws, proposing engineering modifications that improved efficiency and operational performance by 18%."
    ],
    skills: ["Circuit Simulation", "System Testing", "Technical Documentation", "Design Optimization", "Troubleshooting"]
  },
  {
    id: "exp-gta",
    role: "Graduate Teaching Assistant",
    company: "Western New England University",
    location: "Springfield, MA",
    period: "September 2022 – December 2023",
    type: "Academic",
    bullets: [
      "Assisted faculty in delivering core curriculum for Digital System Design, Stochastic Processes, and VHDL courses, providing dedicated academic support and conducting hands-on lab sessions.",
      "Developed and graded assignments, quizzes, and exams while offering targeted one-on-one tutoring for 40+ engineering students to reinforce complex theoretical concepts.",
      "Contributed to the active development of instructional lab manuals and aided students in real-time troubleshooting of FPGA hardware and simulation bugs in ModelSim."
    ],
    skills: ["VHDL Instruction", "ModelSim Lab Lead", "Stochastic Processes", "Grading & Mentorship", "Curriculum Development"]
  },
  {
    id: "exp-stem",
    role: "Volunteer – STEM Outreach Program",
    company: "Western New England University",
    location: "Springfield, MA",
    period: "2022 – 2023",
    type: "Volunteer",
    bullets: [
      "Mentored regional high school students in fundamental circuit design, breadboarding, and basic robotics.",
      "Conducted interactive demonstrations on sensor integration and microcontrollers, fostering sustained youth interest in STEM fields and electrical engineering careers."
    ],
    skills: ["STEM Education", "Robotics Mentoring", "Circuit Prototyping", "Public Speaking"]
  }
];

export const projects: Project[] = [
  {
    id: "proj-kalman-filter",
    title: "Stochastic Processes & Kalman Filtering for Signal Processing",
    category: "signal-processing",
    categoryLabel: "Signal Processing & Stochastic Systems",
    period: "Summer 2022",
    shortDescription: "Development and implementation of discrete Kalman Filter algorithms to estimate dynamic signal states in high-noise environments.",
    fullDescription: "Formulated and executed a full mathematical state-space model incorporating white Gaussian noise and sensor uncertainty. Simulated signal estimation performance across varying signal-to-noise ratios (SNR), demonstrating robust variance reduction and rapid convergence of the Kalman gain matrix.",
    highlights: [
      "Developed recursive Kalman estimation algorithms in MATLAB and Python for dynamic sensor tracking.",
      "Achieved a 78% noise variance attenuation under severe Gaussian noise conditions.",
      "Conducted comprehensive performance robustness analysis against measurement latency and modeling bias."
    ],
    tools: ["MATLAB", "Python", "NumPy", "Simulink", "Stochastic Analysis"],
    featured: true,
    metrics: [
      { label: "Noise Reduction", value: "78%" },
      { label: "Gain Convergence", value: "< 12 steps" },
      { label: "SNR Improvement", value: "+14 dB" }
    ],
    liveDemoType: "kalman",
    codeSnippet: {
      language: "matlab",
      code: `% Kalman Filter Discrete Implementation
function [x_est, P] = kalman_step(x_prev, P_prev, z_meas, A, B, u, H, Q, R)
    % 1. Prediction (Time Update)
    x_pred = A * x_prev + B * u;
    P_pred = A * P_prev * A' + Q;
    
    % 2. Innovation & Kalman Gain (Measurement Update)
    y_innov = z_meas - H * x_pred;
    S = H * P_pred * H' + R;
    K = P_pred * H' * inv(S);
    
    % 3. Corrected State & Covariance
    x_est = x_pred + K * y_innov;
    P = (eye(size(P_prev)) - K * H) * P_pred;
end`,
      description: "Core recursive time-update and measurement-update matrix formulation for the Kalman Filter."
    }
  },
  {
    id: "proj-digital-system-vhdl",
    title: "Digital System Design and Integration in VHDL",
    category: "digital-systems",
    categoryLabel: "Digital Systems & VHDL",
    period: "Spring 2023",
    shortDescription: "Design, behavioral simulation, and RTL synthesis of a real-time digital integrated system with built-in error correction.",
    fullDescription: "Engineered a multi-module digital processing pipeline in VHDL featuring finite state machine (FSM) control logic, Hamming (7,4) error detection and correction, and synchronous FIFO buffering. Validated timing and logic functionality via ModelSim testbenches prior to Xilinx ISE bitstream synthesis.",
    highlights: [
      "Designed pipelined RTL architecture minimizing critical path delay for 100MHz clock target.",
      "Implemented Hamming single-error correction and double-error detection (SECDED) block.",
      "Wrote modular ModelSim self-checking testbenches achieving 100% code branch coverage."
    ],
    tools: ["VHDL", "ModelSim", "Xilinx ISE", "Digital Logic", "FSM Synthesis"],
    featured: true,
    metrics: [
      { label: "Clock Frequency", value: "100 MHz" },
      { label: "Error Recovery", value: "1-bit Auto-Fix" },
      { label: "Test Coverage", value: "100%" }
    ],
    liveDemoType: "vhdl",
    codeSnippet: {
      language: "vhdl",
      code: `-- VHDL FSM Controller for Real-Time Packet Decoder
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity PacketController is
    Port ( clk     : in  STD_LOGIC;
           rst     : in  STD_LOGIC;
           data_in : in  STD_LOGIC_VECTOR(7 downto 0);
           valid   : in  STD_LOGIC;
           err_flg : out STD_LOGIC;
           ready   : out STD_LOGIC );
end PacketController;

architecture Behavioral of PacketController is
    type state_type is (IDLE, READ_HDR, PARSE_PLD, CHECKSUM, EMIT_ACK);
    signal current_state, next_state : state_type;
begin
    process(clk, rst)
    begin
        if rst = '1' then
            current_state <= IDLE;
        elsif rising_edge(clk) then
            current_state <= next_state;
        end if;
    end process;
end Behavioral;`,
      description: "Synthesizable VHDL state machine handling synchronous packet validation and error checking."
    }
  },
  {
    id: "proj-systems-integration",
    title: "Multi-Subsystem Industrial Integration & Automation",
    category: "systems-integration",
    categoryLabel: "Systems Integration & Interoperability",
    period: "Fall 2023",
    shortDescription: "Integration of heterogeneous engineering subsystems for industrial telemetry, hardware-in-the-loop validation, and protocol bridging.",
    fullDescription: "Led the architectural integration of multi-domain sensor hardware, microcontrollers, and software monitoring units. Created unified data aggregation schemas over UART/Modbus and engineered fault-tolerant failover routines to ensure continuous operation in industrial automated pipelines.",
    highlights: [
      "Designed protocol converter bridging SPI sensor nodes to higher-level serial and network buses.",
      "Constructed a hardware-in-the-loop (HIL) test harness to stress-test asynchronous packet drops.",
      "Improved end-to-end system reliability and reduced communication packet jitter by 34%."
    ],
    tools: ["LabVIEW", "Python", "C++", "Multisim", "Systems Engineering"],
    featured: true,
    metrics: [
      { label: "Jitter Reduction", value: "34%" },
      { label: "Subsystems Linked", value: "4 Distinct Modules" },
      { label: "Uptime Stability", value: "99.8%" }
    ],
    liveDemoType: "telemetry",
    codeSnippet: {
      language: "python",
      code: `# Real-Time Industrial Protocol Telemetry Aggregator
import serial
import struct
import time

class SubsystemGateway:
    def __init__(self, port='/dev/ttyUSB0', baud=115200):
        self.ser = serial.Serial(port, baud, timeout=0.5)
        self.frame_header = 0xAA55
        
    def poll_telemetry_frame(self):
        header = self.ser.read(2)
        if len(header) == 2 and struct.unpack('>H', header)[0] == self.frame_header:
            payload = self.ser.read(12)
            temp, pressure, current, status = struct.unpack('>fffH', payload)
            return {'temperature': temp, 'pressure': pressure, 'current': current, 'status': status}
        return None`,
      description: "Python hardware telemetry parser bridging serial micro-controllers with central industrial monitoring."
    }
  },
  {
    id: "proj-web-management-dashboard",
    title: "Engineering Telemetry & Systems Management Dashboard",
    category: "web-management",
    categoryLabel: "Web Development & Systems Management",
    period: "2024 – 2025",
    shortDescription: "Modern responsive web platform for real-time electrical instrumentation monitoring, data logging, and interactive parameter tuning.",
    fullDescription: "A full-featured web-based monitoring interface designed to visualize high-frequency sensor feeds, control parameters for hardware test rigs, and manage lab inventory. Features responsive charts, instant search, dynamic dark/light theming, and RESTful telemetry hooks.",
    highlights: [
      "Built with React, TypeScript, and modern styling with sub-10ms render latency for live data points.",
      "Integrated responsive SVG waveform visualizers with pan, zoom, and threshold trigger alarms.",
      "Configured robust client-side caching and offline-first state persistence."
    ],
    tools: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Vite", "Node.js"],
    featured: false,
    metrics: [
      { label: "Render Latency", value: "< 10 ms" },
      { label: "Lighthouse Score", value: "98/100" },
      { label: "Responsive", value: "100% Mobile Ready" }
    ]
  },
  {
    id: "proj-spc-hardware-quality",
    title: "Statistical Quality Control (SQC) & Yield Optimization",
    category: "systems-integration",
    categoryLabel: "Quality Engineering & Statistics",
    period: "Fall 2023",
    shortDescription: "Statistical analysis of circuit component variations, automated Shewhart control charting, and Cpk capability maximization.",
    fullDescription: "Developed automated statistical scripts to evaluate component tolerance drift in analog-to-digital converters (ADC) and resistor networks. Created control charts to detect out-of-control states before yield degradation occurred.",
    highlights: [
      "Formulated automated X-bar and R charts tracking 10,000+ manufacturing data points.",
      "Increased simulated batch production process capability (Cpk) from 1.15 to 1.62.",
      "Delivered comprehensive statistical documentation identifying root-cause thermal drifts."
    ],
    tools: ["Statistical Quality Control", "Python", "Pandas", "Minitab", "Data Analysis"],
    featured: false,
    metrics: [
      { label: "Cpk Improvement", value: "1.15 → 1.62" },
      { label: "Data Points", value: "10,000+" },
      { label: "Defect Reduction", value: "42%" }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Electrical & Digital Engineering",
    iconName: "Cpu",
    skills: [
      { name: "VHDL & RTL Design", level: 90, category: "Hardware", experience: "Coursework & GTA" },
      { name: "Digital Integrated Circuits (CMOS)", level: 85, category: "Hardware", experience: "WNEU Labs" },
      { name: "Circuit Design & Analysis", level: 88, category: "Hardware", experience: "Takeo.ai & Projects" },
      { name: "ModelSim & Xilinx ISE", level: 90, category: "Simulation", experience: "Simulation & Synthesis" },
      { name: "Cadence & NI Multisim", level: 82, category: "EDA Tools", experience: "IC & Board Design" }
    ]
  },
  {
    title: "Signal Processing & Math Modeling",
    iconName: "Activity",
    skills: [
      { name: "Kalman Filtering & State Estimation", level: 92, category: "Algorithms", experience: "Research & Projects" },
      { name: "Stochastic Processes & Noise Analysis", level: 88, category: "Theory", experience: "MS Coursework" },
      { name: "MATLAB & Simulink (Certified)", level: 95, category: "Tools", experience: "Advanced Level Cert" },
      { name: "Linear & Nonlinear Systems Modeling", level: 86, category: "Control", experience: "WNEU Analysis" },
      { name: "Digital Signal Processing (DSP)", level: 85, category: "Algorithms", experience: "Academic Projects" }
    ]
  },
  {
    title: "Software & Web Development",
    iconName: "Code2",
    skills: [
      { name: "Python (NumPy, SciPy, Pandas)", level: 90, category: "Languages", experience: "Telemetry & Modeling" },
      { name: "C / C++ (Embedded Logic)", level: 82, category: "Languages", experience: "Systems Integration" },
      { name: "HTML5, CSS3 & Modern Styling", level: 92, category: "Web", experience: "Web Management" },
      { name: "JavaScript & TypeScript", level: 88, category: "Web", experience: "Dashboards & Tools" },
      { name: "React & Component Architecture", level: 85, category: "Frameworks", experience: "Web Apps" }
    ]
  },
  {
    title: "Systems Integration & Quality Control",
    iconName: "GitMerge",
    skills: [
      { name: "Hardware-in-the-Loop Integration", level: 88, category: "Integration", experience: "Industrial Projects" },
      { name: "Statistical Quality Control (SQC/SPC)", level: 86, category: "Quality", experience: "WNEU Engineering" },
      { name: "LabVIEW Instrumentation", level: 80, category: "Tools", experience: "Lab Automation" },
      { name: "Technical Documentation & Reporting", level: 92, category: "Management", experience: "Takeo.ai & WNEU" },
      { name: "Troubleshooting & Root-Cause Analysis", level: 90, category: "Engineering", experience: "Industry & Academic" }
    ]
  }
];

export const awards: Award[] = [
  {
    title: "MATLAB Certification – Advanced Level",
    issuer: "MathWorks / Western New England University",
    year: "2023",
    description: "Demonstrated advanced proficiency in mathematical modeling, script optimization, Simulink blocksets, and signal analysis.",
    badgeType: "certification"
  },
  {
    title: "Dean's List (Spring 2023, Fall 2023)",
    issuer: "Western New England University",
    year: "2023",
    description: "Awarded for achieving exceptional academic distinction and GPA standing during Master's engineering program.",
    badgeType: "award"
  },
  {
    title: "Academic Excellence Scholarship",
    issuer: "Western New England University",
    year: "2021 – 2023",
    description: "Merit-based graduate scholarship granted across all semesters of graduate studies in Electrical Engineering.",
    badgeType: "scholarship"
  },
  {
    title: "IEEE Student Member Distinction",
    issuer: "Institute of Electrical and Electronics Engineers (IEEE)",
    year: "2021 – 2023",
    description: "Active participant in technical conferences, seminars, and collaborative engineering initiatives.",
    badgeType: "award"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "kalman-filter-explained",
    title: "Demystifying Kalman Filters in Real-Time Sensor Processing",
    slug: "demystifying-kalman-filters-sensor-processing",
    excerpt: "How to estimate real hidden states from noisy sensor inputs using discrete recursive updates and dynamic covariance estimation.",
    date: "January 15, 2025",
    readTime: "6 min read",
    category: "Signal Processing",
    tags: ["Kalman Filter", "MATLAB", "Sensor Fusion", "Stochastic Processes"],
    tableOfContents: [
      "The Problem of Sensor Noise",
      "The Two-Step Recursive Cycle",
      "Predict: Projecting the State Forward",
      "Update: Finding the Optimal Kalman Gain",
      "Practical Implementation in Python & MATLAB"
    ],
    content: `
### 1. The Problem of Sensor Noise
In robotics, aerospace, and biomedical instrumentation, sensors never provide perfect values. Accelerometers contain thermal drift, GPS receivers suffer from multipath interference, and optical encoders jitter. If an engineer takes raw measurements as ground truth, the control loop can become unstable.

A **Kalman Filter** is an optimal recursive algorithm that estimates the internal states of a linear dynamic system from a series of noisy measurements. It operates by maintaining two key pieces of information:
1. The estimated state vector $\\hat{x}$
2. The error covariance matrix $P$ (measuring the uncertainty of the estimate)

### 2. The Two-Step Recursive Cycle
The true beauty of the Kalman Filter lies in its recursive structure. You do not need to store thousands of historical sensor readings. You only need the state from the previous timestamp ($k-1$) and the current measurement ($z_k$).

\`\`\`
          +-----------------------------+
          |      PREDICTION STEP        |
          |  x̂_pred = A * x̂_prev + B*u   |
          |  P_pred = A * P_prev * A' + Q |
          +--------------+--------------+
                         |
                         v
          +-----------------------------+
          |       CORRECTION STEP       |
          |  K = P_pred * H' * inv(S)   |
          |  x̂ = x̂_pred + K * (z - H*x̂) |
          |  P = (I - K * H) * P_pred   |
          +-----------------------------+
\`\`\`

### 3. Tuning the Process (Q) vs Measurement (R) Noise
- **$Q$ (Process Noise Covariance)**: How much trust do you have in your physics model? High $Q$ tells the filter that unmodeled physical forces are present, making the filter react faster to new measurements.
- **$R$ (Measurement Noise Covariance)**: How noisy is the physical sensor? High $R$ tells the filter that the sensor is unreliable, causing the filter to smooth out drastic jumps.

### 4. Key Takeaways
When implemented properly in embedded C++ or MATLAB, discrete Kalman Filters execute in sub-millisecond timeframes, making them the gold standard for real-time telemetry systems.
    `
  },
  {
    id: "vhdl-synthesis-patterns",
    title: "VHDL vs. Verilog: Architectural Synthesis for High-Reliability FPGAs",
    slug: "vhdl-vs-verilog-fpga-synthesis",
    excerpt: "A comparison of strong typing, concurrency paradigms, and RTL synthesis pitfalls in mission-critical digital systems.",
    date: "November 28, 2024",
    readTime: "8 min read",
    category: "Digital Systems",
    tags: ["VHDL", "FPGA", "ModelSim", "Digital Design"],
    tableOfContents: [
      "Why VHDL Dominates Mission-Critical Hardware",
      "Strong Typing as a Defense Mechanism",
      "Handling Finite State Machines (FSM)",
      "Timing Closure and Metastability"
    ],
    content: `
### Why VHDL Dominates Mission-Critical Hardware
While Verilog is popular in consumer ASIC design due to its C-like brevity, **VHDL** remains the preferred hardware description language in defense, aerospace, and high-reliability industrial automation. 

The primary reason is **strict type safety**. In VHDL, you cannot inadvertently assign a 7-bit bus to an 8-bit signal or mix signed and unsigned integers without explicit type conversions.

### Structuring Synchronous FSMs
A common anti-pattern in RTL coding is combining state registers and combinational logic into a single monolithic process block. The recommended approach is the **Two-Process FSM pattern**:
1. Synchronous Process: Sensitive only to \`clk\` and \`rst\` for updating the state vector.
2. Combinational Process: Determines \`next_state\` and outputs based on inputs and \`current_state\`.

This avoids unintended latches and makes static timing analysis (STA) predictable in ModelSim and Xilinx ISE.
    `
  },
  {
    id: "hardware-to-web-dashboard",
    title: "Bridging Hardware Systems Integration with Modern Web Dashboards",
    slug: "bridging-hardware-systems-web-dashboards",
    excerpt: "How modern web standards like WebSockets and TypeScript can modernize industrial instrumentation and remote telemetry.",
    date: "October 10, 2024",
    readTime: "5 min read",
    category: "Web & Systems",
    tags: ["Systems Integration", "React", "TypeScript", "IoT", "Telemetry"],
    tableOfContents: [
      "The Legacy Gap in Lab Instrumentation",
      "Architecture of a Real-Time Telemetry Bridge",
      "Sub-10ms Visualization with Canvas & React",
      "The Future of Web-Based Hardware Management"
    ],
    content: `
### The Legacy Gap in Lab Instrumentation
For decades, test engineers relied on heavy desktop software packages with proprietary communication drivers. While powerful, these solutions make remote collaboration, cloud logging, and multi-device monitoring cumbersome.

By pairing microcontrollers (handling microsecond timing) with a lightweight local gateway and a modern web dashboard built in React and TypeScript, engineering teams achieve:
- Universal accessibility across tablets, laptops, and smartphones.
- Zero-install field diagnostics for field engineers.
- Instant integration with cloud storage and automated alerting pipelines.
    `
  },
  {
    id: "statistical-quality-control-hardware",
    title: "Statistical Quality Control & Six Sigma in Hardware Production",
    slug: "statistical-quality-control-hardware",
    excerpt: "Implementing Shewhart control charts and Cpk process capability indices to eliminate manufacturing drift.",
    date: "August 22, 2024",
    readTime: "7 min read",
    category: "Quality Engineering",
    tags: ["Statistical Quality Control", "Six Sigma", "Cpk", "Manufacturing"],
    tableOfContents: [
      "Common Cause vs. Special Cause Variation",
      "Constructing X-bar and R Charts",
      "Understanding Process Capability (Cp vs. Cpk)",
      "Automating SPC Pipelines with Python"
    ],
    content: `
### Common Cause vs. Special Cause Variation
In electronics manufacturing, variations in component values (resistors, capacitor ESR, crystal frequencies) are inevitable. 
- **Common Cause Variation**: Natural background noise of the process.
- **Special Cause Variation**: Specific external disturbances, such as soldering nozzle clogging, thermal chamber drift, or vendor silicon batch degradation.

### Process Capability ($C_p$ and $C_{pk}$)
A process is considered capable if its natural tolerance limits fall safely inside the customer specifications. A $C_{pk} \\ge 1.33$ indicates a 4-sigma process, while $C_{pk} \\ge 1.67$ meets Six Sigma standards.
    `
  }
];

export const hostingGuideSteps: HostingGuideStep[] = [
  {
    platform: "Vercel (Recommended - Instant 1-Click)",
    title: "Deploying to Vercel",
    description: "Vercel is the fastest and easiest way to deploy modern React/Vite frontends with global edge CDN and automatic HTTPS.",
    steps: [
      "Push your repository to your GitHub account (`git push origin main`).",
      "Sign in to vercel.com using your GitHub account.",
      "Click 'Add New...' > 'Project' and select your portfolio repository.",
      "Vercel will auto-detect Vite. Ensure the Build Command is `npm run build` and Output Directory is `dist`.",
      "Click 'Deploy'. Your personal website will be live in under 45 seconds on your-subdomain.vercel.app!"
    ],
    commands: [
      "# Or deploy via Vercel CLI directly:",
      "npm i -g vercel",
      "vercel"
    ]
  },
  {
    platform: "GitHub Pages (Free Static Hosting)",
    title: "Deploying to GitHub Pages",
    description: "Host directly from your GitHub repository using GitHub Actions.",
    steps: [
      "In `vite.config.ts`, set `base: '/portfolio/'` (or `'/'` if using username.github.io).",
      "Install gh-pages: `npm install -D gh-pages`.",
      "Add to `package.json` scripts: `\"deploy\": \"vite build && gh-pages -d dist\"`.",
      "Run `npm run deploy`. Your site will be published at `https://<username>.github.io/<repo-name>/`."
    ],
    commands: [
      "npm install -D gh-pages",
      "npm run deploy"
    ]
  },
  {
    platform: "Netlify (Drag & Drop or Git)",
    title: "Deploying to Netlify",
    description: "Fast zero-config deployment with preview branches and form handling.",
    steps: [
      "Build your project locally: `npm run build`.",
      "Go to app.netlify.com and drag & drop the created `dist` folder onto the Netlify dashboard.",
      "Alternatively, connect your GitHub repo and set Build Command to `npm run build` and Publish Directory to `dist`."
    ]
  },
  {
    platform: "Formspree Contact Integration",
    title: "Setting Up Real Email Inquiries with Formspree",
    description: "Connect the contact form directly to your email (gurung.sg79@gmail.com) without writing any backend server.",
    steps: [
      "Go to formspree.io and create a free account.",
      "Click '+ New Form' and name it 'Portfolio Contact'.",
      "Set your target email to `gurung.sg79@gmail.com`.",
      "Copy your unique Formspree Form ID (e.g. `xvgoqzkp` or URL `https://formspree.io/f/xvgoqzkp`).",
      "In the Contact section of this website, you can paste your Formspree ID or enter it into your `.env` configuration as `VITE_FORMSPREE_ID`."
    ]
  }
];
