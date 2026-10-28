"use client";

import React, { useState, useEffect } from "react";
import { Search, Terminal, Cpu, Layers, BookOpen, Briefcase, Mail, Volume2, VolumeX, ArrowRight, ExternalLink, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onScrollTo: (sectionId: string) => void;
  onToggleSound: () => void;
  isMuted: boolean;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onScrollTo,
  onToggleSound,
  isMuted,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: "cv",
      label: "Download Official CV & Application Pack (PDF)",
      category: "Documents",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      run: () => {
        onClose();
        window.open("/Eugene-Maposa-Application-Pack.pdf", "_blank");
      },
    },
    {
      id: "terminal",
      label: "Open Developer CLI Terminal (~)",
      category: "Tools",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: "algo",
      label: "Jump to Algorithm Visualizer (A* & Dijkstra)",
      category: "Demos",
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      run: () => {
        onClose();
        onScrollTo("cs-demos");
      },
    },
    {
      id: "arch",
      label: "Jump to Distributed Topology Canvas",
      category: "Demos",
      icon: <Layers className="w-4 h-4 text-blue-400" />,
      run: () => {
        onClose();
        onScrollTo("architecture");
      },
    },
    {
      id: "projects",
      label: "Browse ZIMSCORE (Vercel) & GitHub Projects",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      run: () => {
        onClose();
        onScrollTo("projects");
      },
    },
    {
      id: "skills",
      label: "Examine CV Technical Competencies & Certifications",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      run: () => {
        onClose();
        onScrollTo("skills");
      },
    },
    {
      id: "experience",
      label: "View Technovation Centre Experience & Education",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
      run: () => {
        onClose();
        onScrollTo("experience");
      },
    },
    {
      id: "contact",
      label: "Contact Eugene (Calls, WhatsApp & Email)",
      category: "Connect",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onClose();
        onScrollTo("contact");
      },
    },
    {
      id: "sound",
      label: isMuted ? "Enable Synthesized Audio Feedback" : "Mute Sound Effects",
      category: "Settings",
      icon: isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />,
      run: () => {
        onToggleSound();
      },
    },
  ];

  // Dynamic project links
  const projectItems = PORTFOLIO_DATA.projects.map(p => ({
    id: `project-${p.id}`,
    label: `Project: ${p.title} (${p.category})`,
    category: "Projects",
    icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
    run: () => {
      onClose();
      onScrollTo("projects");
    }
  }));

  const allItems = [...actions, ...projectItems];
  const filtered = allItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        soundFx.playKeypress();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        soundFx.playKeypress();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          soundFx.playClick();
          filtered[selectedIndex].run();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl glass-panel-elevated rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, project, or section..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 font-sans text-sm"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-slate-900/90 font-mono text-xs">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  item.run();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 text-left ${
                  selectedIndex === index
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                    {item.category}
                  </span>
                  {selectedIndex === index && (
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with ↑ ↓ and Press Enter</span>
          <span>Antigravity CS Palette</span>
        </div>
      </div>
    </div>
  );
}
