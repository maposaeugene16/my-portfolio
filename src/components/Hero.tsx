"use client";

import React, { useState } from "react";
import { Terminal, ShieldCheck, ArrowRight, Download, Cpu, Play, Copy, Check, Sparkles, ExternalLink, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

interface HeroProps {
  onOpenTerminal: () => void;
  onScrollTo: (id: string) => void;
}

export default function Hero({ onOpenTerminal, onScrollTo }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm shadow-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">{PORTFOLIO_DATA.profile.status}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Eugene Maposa — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Computer Science</span> Graduate & Software Developer
          </h1>

          {/* Subheading / Professional Profile from CV */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            {PORTFOLIO_DATA.profile.summary}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onScrollTo("projects");
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-xl shadow-emerald-500/25 active:scale-95"
            >
              <span>View ZIMSCORE & Software Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-mono text-sm border border-slate-700 transition-all duration-200 hover:border-emerald-500/40"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Launch Developer Shell</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                ~
              </kbd>
            </button>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-mono text-sm border border-slate-800 transition-all duration-200"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
            </button>

            <a
              href="/Eugene-Maposa-Application-Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSuccess()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-mono text-sm border border-cyan-500/40 transition-all duration-200 hover:border-cyan-300 shadow-md shadow-cyan-500/10"
              title="View & Download Official Application Pack (CV + NUST Transcript + Degree Certificate)"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download CV & Pack (PDF)</span>
              <Download className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* System Metrics Strip */}
          <div className="pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md shadow-2xl">
              {PORTFOLIO_DATA.profile.metrics.map((m, idx) => (
                <div key={idx} className="p-3 text-center border-r last:border-r-0 border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Academic Footnote */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              NUST B.Sc. (Honours) Computer Science
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Classification: <strong className="text-slate-200">Upper Second Division (2.1)</strong>
            </span>
            <span>•</span>
            <span className="text-cyan-400">
              496 Credits Earned
            </span>
            <span>•</span>
            <span className="text-emerald-400">
              Technovation Centre Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
