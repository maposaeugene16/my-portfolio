"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Search, Volume2, VolumeX, Menu, X, Code2, Sparkles, Send, FileText, Download } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onToggleSound: () => void;
  isMuted: boolean;
  onOpenContact: () => void;
}

export default function Navbar({
  onOpenTerminal,
  onOpenCommandPalette,
  onToggleSound,
  isMuted,
  onOpenContact,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "CS Lab", href: "#cs-demos" },
    { label: "Architecture", href: "#architecture" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#"
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
                EM
              </div>
            </div>
            <div>
              <div className="font-mono font-bold text-sm tracking-wider text-white flex items-center gap-2">
                <span>{PORTFOLIO_DATA.profile.name.toUpperCase()}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                COMPUTER SCIENCE // FULL-STACK DEVELOPER
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFx.playClick()}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Utility Tools & Actions */}
          <div className="flex items-center gap-2.5">
            {/* View / Download Official CV Application Pack */}
            <a
              href="/Eugene-Maposa-Application-Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSuccess()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:text-white text-xs font-mono font-medium transition-all shadow-sm shadow-cyan-500/10"
              title="View & Download Eugene Maposa's Official CV & Application Pack"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">CV / Application Pack</span>
              <Download className="w-3 h-3 text-cyan-400 opacity-80" />
            </a>

            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 text-xs font-mono text-slate-300 transition-all"
              title="Quick Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* CLI Terminal Launcher */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-all"
              title="Toggle Shell Terminal (~)"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Shell</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-emerald-950 text-[10px] text-emerald-300">
                ~
              </kbd>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              title={isMuted ? "Unmute audio synthesizer" : "Mute audio synthesizer"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Contact / Hire Handshake button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenContact();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold font-mono transition-all duration-150 shadow-md shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-slate-950/95 border-b border-slate-800 space-y-2 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <a
              href="/Eugene-Maposa-Application-Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSuccess()}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center gap-2 border border-cyan-500/40 font-semibold"
            >
              <FileText className="w-4 h-4 text-cyan-400" /> View & Download CV (PDF)
              <Download className="w-3.5 h-3.5" />
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-center gap-2 border border-emerald-500/30"
              >
                <Terminal className="w-4 h-4" /> Open CLI Shell
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-900 text-slate-300 text-xs flex items-center justify-center gap-2 border border-slate-800"
              >
                <Search className="w-4 h-4" /> Search (⌘K)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
