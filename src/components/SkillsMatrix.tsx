"use client";

import React, { useState } from "react";
import { Cpu, Award, Shield, CheckCircle2, BookOpen, Layers, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState<"competencies" | "certifications" | "courses">("competencies");
  const [activeCategory, setActiveCategory] = useState<string>(PORTFOLIO_DATA.technicalCompetencies[0].name);

  const currentCategory =
    PORTFOLIO_DATA.technicalCompetencies.find(c => c.name === activeCategory) ||
    PORTFOLIO_DATA.technicalCompetencies[0];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              CV Technical Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Competencies & Certifications
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mt-2">
              Academic training from NUST, practical experience at the Technovation Centre, and certified training in backend web development.
            </p>
          </div>

          {/* Academic Honors Callout Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 text-xs font-mono shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold flex items-center gap-2">
                <span>NUST Computer Science</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold">2.1 Honours</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                496 Credits • Awarded 17 Sep 2026 • Certificate H0087726
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher: Competencies vs Certifications vs Academic Courses */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("competencies");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === "competencies"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            }`}
          >
            CV Technical Competencies
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("certifications");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === "certifications"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            }`}
          >
            Professional Certifications ({PORTFOLIO_DATA.certifications.length})
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("courses");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === "courses"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            }`}
          >
            Relevant Academic Study (NUST Courses)
          </button>
        </div>

        {/* TAB 1: CV Technical Competencies */}
        {activeTab === "competencies" && (
          <div>
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {PORTFOLIO_DATA.technicalCompetencies.map((cat) => {
                const isSelected = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveCategory(cat.name);
                    }}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                      isSelected
                        ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/15"
                        : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                    }`}
                  >
                    <div className={`font-mono text-sm font-bold ${isSelected ? "text-cyan-300" : "text-slate-300"}`}>
                      {cat.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                      {cat.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Detail Panel */}
            <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
              <div className="mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                  <span>{currentCategory.name}</span>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  {currentCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCategory.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-slate-400 leading-relaxed pl-6">
                      {skill.context}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Baseline Bar */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Verified via NUST Academic Curriculum & Technovation Centre (2024–2026)</span>
                </div>
                <div className="text-slate-500">
                  Languages: English, Shona, Ndebele
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Professional Certifications */}
        {activeTab === "certifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Verified Certification
                  </span>
                  <span className="text-xs font-mono text-slate-400">{cert.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-emerald-400 font-semibold">
                  Issuer: {cert.issuer}
                </p>

                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Relevant Academic Study */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white font-mono">
                  Development & Engineering Courses
                </h3>
              </div>
              <ul className="space-y-3 font-mono text-xs text-slate-300">
                {PORTFOLIO_DATA.academicStudy.development.map((course, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-mono">
                  Systems & Computing Courses
                </h3>
              </div>
              <ul className="space-y-3 font-mono text-xs text-slate-300">
                {PORTFOLIO_DATA.academicStudy.systems.map((course, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
