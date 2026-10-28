"use client";

import React, { useState } from "react";
import { Briefcase, GraduationCap, Users, Calendar, MapPin, CheckCircle2, TrendingUp, Mail, Phone, ExternalLink, FileText, Download } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

export default function ExperienceTimeline() {
  const [sectionView, setSectionView] = useState<"experience" | "education" | "references">("experience");

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Verified Background from Curriculum Vitae
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Experience, Education & References
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mt-2">
              Practical work experience at the NUST Technovation Centre, academic credentials, and official university referees.
            </p>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setSectionView("experience");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                sectionView === "experience"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Experience (Technovation Centre)
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setSectionView("education");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                sectionView === "education"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Education (NUST & A-Level)
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setSectionView("references");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                sectionView === "references"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              NUST References ({PORTFOLIO_DATA.references.length})
            </button>

            <a
              href="/Eugene-Maposa-Application-Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSuccess()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 font-bold transition-all shadow-sm shadow-cyan-500/10"
              title="Download Complete Application Pack (CV + Transcript + Degree Certificate)"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CV Pack (PDF)</span>
              <Download className="w-3 h-3 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* VIEW 1: Professional Experience */}
        {sectionView === "experience" && (
          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      {exp.company}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 sm:justify-end mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <div className="text-cyan-400 font-bold flex items-center gap-2 text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    Practical Experience Highlights
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                    {exp.metrics.map((m, mIdx) => (
                      <span key={mIdx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: Education History (NUST, A-Level, O-Level) */}
        {sectionView === "education" && (
          <div className="space-y-6">
            {PORTFOLIO_DATA.educationHistory.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      {edu.institution}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {edu.qualification}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 self-start sm:self-auto">
                    {edu.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-mono text-slate-200 font-semibold">
                  {edu.details}
                </p>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: NUST Academic & Professional References */}
        {sectionView === "references" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.references.map((ref, idx) => (
              <div
                key={idx}
                className="glass-panel-elevated rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    Official Reference
                  </span>
                  <h3 className="text-lg font-bold text-white font-mono">{ref.name}</h3>
                  <div className="text-xs font-mono text-emerald-400 font-semibold">{ref.role}</div>
                  <div className="text-xs font-mono text-slate-300">{ref.department}</div>
                  <div className="text-xs font-mono text-slate-500">{ref.institution}</div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-mono">
                  <a
                    href={`tel:${ref.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ref.phone}</span>
                  </a>
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-2 text-cyan-400 hover:underline truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="truncate">{ref.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
