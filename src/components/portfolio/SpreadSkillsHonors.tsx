import React from 'react'
import { Terminal, Award, ShieldCheck, Cpu, Code, BookOpen, Trophy, CheckCircle, Flame } from 'lucide-react'

interface SpreadProps {
  className?: string
}

export const SpreadSkillsHonors: React.FC<SpreadProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex bg-[#faf8f5] text-slate-800 select-none overflow-hidden ${className}`}>
      {/* ========================================================= */}
      {/* LEFT PAGE: TECHNICAL SKILLS MATRIX (PAGE 7)               */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pr-7 sm:pr-9 border-r border-slate-200/70 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            07 / Core Technical Matrix
          </span>
          <span className="text-[10px] font-mono text-blue-700 font-semibold">Toolchain & Stacks</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-700" />
            <span>Technical Skills & Stacks</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Specialized competencies across cybersecurity, systems programming, and distributed engineering.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="space-y-2.5 my-auto">
          {/* Category 1: Cybersecurity & Forensics */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cybersecurity, Forensics & Security Tools</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Vulnerability Assessment', 'Network Scanning', 'Digital Forensics', 'OSINT', 'Burp Suite', 'Wireshark', 'Nmap/Zenmap', 'Metasploit', 'Kali Linux', 'Recon-ng', 'Maltego'].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono font-medium border border-emerald-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Category 2: Programming Languages */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Programming Languages</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Python', 'C', 'C++', 'Java', 'JavaScript', 'Go', 'Rust', 'Dart', 'SQL', 'Bash & Shell Scripting'].map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-mono font-medium border border-blue-100"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Category 3: Backend, Distributed & Mobile */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
              <Terminal className="w-4 h-4 text-purple-600" />
              <span>Backend, Distributed & Mobile</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['FastAPI', 'WebSockets', 'JWT & RBAC', 'Blockchain', 'IPFS', 'Peer-to-Peer', 'Flutter', 'Firebase'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 text-[10px] font-mono font-medium border border-purple-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Category 4: AI, Data & DevOps */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
              <span>AI, Data & Developer Environments</span>
              <span className="text-[9px] font-mono text-slate-400">Scikit-learn, Docker, Linux</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['NLP', 'Semantic Similarity', 'Text Classification', 'spaCy', 'Docker', 'Git/GitHub', 'Linux (Parrot, Kali, Ubuntu)', 'Android Studio', 'LaTeX'].map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Technical Stacks & Frameworks</span>
          <span>Page 7</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PAGE: HONORS, CERTIFICATIONS & LEADERSHIP (PAGE 8)  */}
      {/* ========================================================= */}
      <div className="w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 pl-7 sm:pl-9 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            08 / Recognitions & Credentials
          </span>
          <span className="text-[10px] font-mono text-amber-700 font-semibold">Honors & Licenses</span>
        </div>

        {/* Title */}
        <div className="mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span>Honors & Certifications</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Competitive programming accolades, legal cyber forensics credentials, and leadership.
          </p>
        </div>

        {/* Honors & Certifications List */}
        <div className="space-y-2.5 my-auto">
          {/* Award 1 */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-amber-200/80 shadow-2xs">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <h3 className="text-xs font-bold text-slate-900">
                  1st Place Winner — National Level Coding Contest
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold shrink-0">
                95% Accuracy
              </span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Aurora Technical and Research Institute (17/06/2023). Outperformed 200 participants in solving complex algorithmic challenges.
            </p>
          </div>

          {/* Award 2 */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <h3 className="text-xs font-bold text-slate-900">
                  Winner — TECHTONIC ’24 Hackathon
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold shrink-0">
                1st of 30 Teams
              </span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Keshav Memorial Engineering College (04/05/2024). Led engineering team to build a high-performance web architecture.
            </p>
          </div>

          {/* Certifications Block */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-900 mb-1.5 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Professional Certifications</span>
            </div>
            <div className="space-y-1 text-[10px] text-slate-700">
              <div className="flex items-center justify-between">
                <span>• <strong>Cyber Crime & Cyber Forensics</strong> (NLU Odisha)</span>
                <span className="font-mono text-emerald-700 font-bold">Scored 90%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• <strong>Ethical Hacking Course</strong> (NPTEL, India)</span>
                <span className="font-mono text-blue-700 font-bold">Scored 71%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• <strong>Cybersecurity Analyst Simulation (IAM)</strong></span>
                <span className="font-mono text-slate-500">Tata Group & Forage</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• <strong>National Cadet Corps (NCC) 'A' Certificate</strong></span>
                <span className="font-mono text-slate-500">Discipline & Leadership</span>
              </div>
            </div>
          </div>

          {/* Leadership & Volunteering */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-900 mb-1 flex items-center gap-1">
              <span>Leadership & Student Societies</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-snug">
              <strong>Social Media Team Head</strong> – Computer Society of India (CSI) KMEC • <strong>Event Organizer</strong> for College Technical & Cultural Events • <strong>NSS</strong> Community Initiatives.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
          <span>Awards, Professional Licenses & Leadership</span>
          <span>Page 8</span>
        </div>
      </div>
    </div>
  )
}

