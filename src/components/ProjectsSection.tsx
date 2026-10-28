"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Star, Award, CheckCircle2, ChevronRight, Layers, SlidersHorizontal } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(PORTFOLIO_DATA.projects[0]);

  const categories = [
    "All",
    "Fintech & Web Systems",
    "Full-Stack & Geolocation",
    "Campus & Enterprise Systems",
    "Systems & Utilities"
  ];

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              Software Repositories & Applications
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Software Engineering Projects
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mt-2">
              Full-stack software applications developed in TypeScript, React, Leaflet maps, LiveKit WebRTC, and Supabase cloud backends.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-150 border ${
                  selectedCategory === cat
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm shadow-emerald-500/20"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects List (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            {filteredProjects.map((project) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveProject(project);
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                      : "bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.liveUrl && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Vercel
                        </span>
                      )}
                      {project.badge && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                          <Award className="w-3 h-3" /> {project.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5 flex items-center justify-between">
                    <span>{project.title}</span>
                    {isSelected && <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </h3>

                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  {/* Quick Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-slate-800/70 font-mono text-[10px]">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <span className="text-slate-500 block truncate">{m.label}</span>
                        <span className="text-cyan-400 font-bold truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Direct Links on Card */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-[11px] font-mono">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Live Demo ↗
                      </a>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Active Project</span>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" /> Code ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Spec Panel (Right Column) */}
          <div className="lg:col-span-7 sticky top-24">
            {activeProject ? (
              <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
                {/* Header & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {activeProject.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                        {activeProject.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {activeProject.title}
                    </h3>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-2 text-xs font-mono"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors flex items-center gap-2 text-xs font-mono"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Quantitative Metric Highlights */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs font-mono text-slate-400">{m.label}</div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    System Architecture Overview
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeProject.overview}
                  </p>
                </div>

                {/* Project Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                    Key Features & Technical Implementations
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.highlights.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Technology & Framework Topology
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
