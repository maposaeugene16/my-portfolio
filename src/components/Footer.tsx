"use client";

import React from "react";
import { Terminal, Shield, Github, Linkedin, ArrowUp, Heart, Cpu } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 relative overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Status info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-white font-bold flex items-center gap-2">
                <span>CLUSTER STATUS: HEALTHY</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[11px] text-slate-500">
                NUST Computer Science (2.1 Honours) • Bulawayo, Zimbabwe
              </div>
            </div>
          </div>

          {/* Socials & Terminal trigger */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Shell CLI (~)</span>
            </button>

            <a
              href={PORTFOLIO_DATA.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. Designed & Built with Next.js 14, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Deterministic • Zero-Crash • High-Throughput</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
