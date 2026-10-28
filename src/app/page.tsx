"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AlgorithmVisualizer from "../components/AlgorithmVisualizer";
import ArchitectureCanvas from "../components/ArchitectureCanvas";
import ProjectsSection from "../components/ProjectsSection";
import SkillsMatrix from "../components/SkillsMatrix";
import ExperienceTimeline from "../components/ExperienceTimeline";
import InteractiveTerminal from "../components/InteractiveTerminal";
import CommandPalette from "../components/CommandPalette";
import ContactDrawer from "../components/ContactDrawer";
import Footer from "../components/Footer";
import { soundFx } from "../components/SoundManager";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.getMuted());

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette (Cmd+K / Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundFx.playClick();
        setIsPaletteOpen((prev) => !prev);
      }
      // Toggle Terminal (Tilde ~ or `)
      if (e.key === "`" || e.key === "~") {
        if (!["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
          e.preventDefault();
          soundFx.playClick();
          setIsTerminalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const nextState = soundFx.toggleMute();
    setIsMuted(nextState);
  };

  const scrollToSection = (sectionId: string) => {
    soundFx.playClick();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Dynamic ambient cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Global Navigation */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 space-y-16 md:space-y-24">
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onScrollTo={scrollToSection}
        />

        {/* Live Interactive Computer Science Labs */}
        <section id="cs-demos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlgorithmVisualizer />
        </section>

        {/* Full-Stack Application Architecture */}
        <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArchitectureCanvas />
        </section>

        {/* Core Engineered Systems & Projects */}
        <ProjectsSection />

        {/* Technical Skills & Systems Matrix */}
        <SkillsMatrix />

        {/* Experience Timeline */}
        <ExperienceTimeline />

        {/* Interactive Contact Banner Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Looking for a dedicated Computer Science graduate?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether discussing full-stack web applications, fintech software, or exploring developer opportunities, feel free to reach out.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setIsContactOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-150 shadow-xl shadow-emerald-500/25 active:scale-95"
                >
                  Contact Eugene
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setIsTerminalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-sm border border-slate-700 transition-all duration-150"
                >
                  Type `sudo hire` in Shell (~)
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating Interactive Terminal Shell */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onScrollTo={scrollToSection}
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
      />

      {/* Contact Drawer Modal */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
