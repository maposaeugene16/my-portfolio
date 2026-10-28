"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";
import confetti from "canvas-confetti";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function InteractiveTerminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "welcome",
      command: "init",
      output: (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p className="text-emerald-400 font-bold">
            Antigravity CS Interactive Terminal v2.4.0 [x86_64-systems-core]
          </p>
          <p className="text-slate-400">
            Type <span className="text-cyan-300 font-bold">help</span> to view available system commands or <span className="text-cyan-300 font-bold">neofetch</span> for machine specs.
          </p>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.playKeypress();

    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal.trim());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const executeCommand = (cmdText: string) => {
    if (!cmdText) return;
    const cleanCmd = cmdText.toLowerCase();

    // Add to history
    setHistory(prev => [...prev, cmdText]);
    setHistoryIndex(-1);
    setInputVal("");

    let outputContent: React.ReactNode = null;

    switch (cleanCmd) {
      case "help":
        outputContent = (
          <div className="space-y-1.5 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
              {PORTFOLIO_DATA.terminalCommands.map((c) => (
                <div key={c.command} className="flex items-baseline gap-2">
                  <span className="text-cyan-400 font-bold w-24 shrink-0">{c.command}</span>
                  <span className="text-slate-400 text-[11px]">{c.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "about":
      case "cv":
      case "download":
      case "download cv":
        outputContent = (
          <div className="space-y-2 py-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">Curriculum Vitae Profile — Eugene Maposa:</p>
            <p className="leading-relaxed">{PORTFOLIO_DATA.profile.summary}</p>
            <div className="pt-1 text-slate-400 space-y-1">
              <p>🎓 Degree: {PORTFOLIO_DATA.profile.education.degree}</p>
              <p>🏛 Institution: {PORTFOLIO_DATA.profile.education.institution} ({PORTFOLIO_DATA.profile.education.grade})</p>
              <p>📜 Credits: {PORTFOLIO_DATA.profile.education.credits} • Certificate: {PORTFOLIO_DATA.profile.education.certificateNo}</p>
              <p>💼 Practical Experience: Technovation Centre, NUST (2 Years: 2024–2026)</p>
              <p>🗣 Languages: {PORTFOLIO_DATA.profile.languages.join(", ")}</p>
            </div>
            <div className="pt-2">
              <a
                href="/Eugene-Maposa-Application-Pack.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-700 hover:bg-cyan-900 transition-colors"
              >
                <span>📄 Click to Download / View Complete Application Pack (PDF) ↗</span>
              </a>
            </div>
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="space-y-3 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Technical Competencies (from CV):</p>
            {PORTFOLIO_DATA.technicalCompetencies.map((cat) => (
              <div key={cat.name} className="border-l-2 border-cyan-500 pl-3">
                <p className="text-cyan-300 font-bold">{cat.name}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.skills.map((s) => (
                    <span key={s.name} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]" title={s.context}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        outputContent = (
          <div className="space-y-3 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Professional Experience (from CV):</p>
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                <p className="text-cyan-400 font-bold">{exp.role} — {exp.period}</p>
                <p className="text-slate-300 text-[11px]">{exp.company} ({exp.location})</p>
                <ul className="text-slate-400 text-[10px] space-y-0.5 pt-1">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>• {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        outputContent = (
          <div className="space-y-2 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Education & Academic Record:</p>
            {PORTFOLIO_DATA.educationHistory.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500 pl-3">
                <p className="text-emerald-300 font-bold">{edu.qualification} ({edu.period})</p>
                <p className="text-slate-400 text-[11px]">{edu.institution} — {edu.details}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "certs":
      case "certifications":
        outputContent = (
          <div className="space-y-2 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Professional Training & Certifications:</p>
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div key={idx} className="border-l-2 border-cyan-500 pl-3">
                <p className="text-cyan-300 font-bold">{cert.title}</p>
                <p className="text-slate-400 text-[11px]">{cert.issuer} • {cert.date}</p>
                <p className="text-slate-500 text-[10px]">{cert.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "references":
        outputContent = (
          <div className="space-y-2 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">NUST Academic & Professional References:</p>
            {PORTFOLIO_DATA.references.map((ref, idx) => (
              <div key={idx} className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <p className="text-purple-300 font-bold">{ref.name} — <span className="text-slate-400">{ref.role}, {ref.department}</span></p>
                <p className="text-slate-400 text-[10px]">{ref.institution}</p>
                <p className="text-cyan-400 text-[10px]">📞 {ref.phone} • ✉️ {ref.email}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputContent = (
          <div className="space-y-3 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Featured Software Repositories (GitHub):</p>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">{p.title}</span>
                  {p.badge && (
                    <span className="text-emerald-400 text-[11px] font-bold">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-[11px] mt-1">{p.tagline}</p>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/60 text-[10px]">
                  <span className="text-slate-500">Stack: {p.techStack.join(" • ")}</span>
                  <div className="flex items-center gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold underline"
                      >
                        live vercel ↗
                      </a>
                    )}
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 underline"
                    >
                      github ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "neofetch":
        outputContent = (
          <div className="flex flex-col md:flex-row gap-6 py-2 text-xs font-mono">
            <pre className="text-emerald-400 font-bold leading-tight select-none">
{`   /\_/\  
  ( o.o ) 
   > ^ <  
 NUST_CS `}
            </pre>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-cyan-400 font-bold">Developer:</span> Eugene Maposa</p>
              <p><span className="text-cyan-400 font-bold">University:</span> National University of Science and Technology (NUST)</p>
              <p><span className="text-cyan-400 font-bold">Degree:</span> B.Sc. (Honours) Computer Science (2.1 Upper Second Class)</p>
              <p><span className="text-cyan-400 font-bold">Graduation:</span> 17 November 2026</p>
              <p><span className="text-cyan-400 font-bold">Location:</span> Bulawayo, Zimbabwe</p>
              <p><span className="text-cyan-400 font-bold">Primary Stack:</span> TypeScript, React, Next.js, Node.js, Supabase, Tailwind</p>
              <p><span className="text-cyan-400 font-bold">GitHub:</span> Eugene-maposa • maposaeugene16</p>
            </div>
          </div>
        );
        break;

      case "algo":
        outputContent = (
          <div className="space-y-1.5 py-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">Executing Benchmark: QuickSelect vs Median-of-Medians (N = 10,000,000)...</p>
            <p className="text-cyan-400">Benchmarking partitioning overhead...</p>
            <p className="text-slate-400">✓ Cache misses: 0.04% (L1/L2 data cache optimized)</p>
            <p className="text-slate-400">✓ Asymptotic bound verified: O(N) average, O(N) deterministic worst-case</p>
            <p className="text-emerald-400 font-semibold">Done in 14.82ms. Zero branch mispredictions in hot loop.</p>
          </div>
        );
        break;

      case "matrix":
        outputContent = (
          <div className="text-emerald-400 font-mono text-xs animate-pulse leading-none py-1">
            01000001 01001110 01010100 01001001 01000111 01010010 01000001 01010110 01001001 01010100 01011001
            <br />
            Wake up, Neo... The matrix has you. Follow the white rabbit.
          </div>
        );
        break;

      case "contact":
        outputContent = (
          <div className="space-y-1.5 py-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">Direct Communication Channels:</p>
            <p>📧 Primary: <span className="text-cyan-400">maposa.eugene16@gmail.com</span></p>
            <p>📧 Secondary: <span className="text-cyan-400">mapseujers@gmail.com</span></p>
            <p>📱 Phones: <span className="text-emerald-400 font-bold">+263 775 126 513</span> / <span className="text-emerald-400 font-bold">+263 713 641 507</span></p>
            <p>📍 Location: <span className="text-slate-300">Mavondo Rd, Nkulumane 12, Bulawayo, Zimbabwe</span></p>
            <p>🐙 GitHub: <a href="https://github.com" target="_blank" className="text-cyan-400 underline">github.com</a> (Accounts: maposa.eugene16@gmail.com • mapseujers@gmail.com)</p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/eugene-maposa" target="_blank" className="text-cyan-400 underline">linkedin.com/in/eugene-maposa</a></p>
            <p>🔑 PGP Fingerprint: <span className="text-amber-400 font-bold">{PORTFOLIO_DATA.profile.socials.pgpKeyId}</span></p>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        soundFx.playSuccess();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        outputContent = (
          <div className="space-y-2 py-2 text-xs font-mono bg-emerald-950/40 p-3 rounded border border-emerald-500/40">
            <p className="text-emerald-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> [PRIVILEGE ELEVATED] ACCESS GRANTED
            </p>
            <p className="text-slate-200">
              Thank you for exploring! Let us collaborate on solving ambitious distributed systems, database internals, and high-performance computing challenges.
            </p>
            <p className="text-cyan-300 font-semibold">
              Drop an email to: {PORTFOLIO_DATA.profile.socials.email}
            </p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        outputContent = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {cmdText}. Type <span className="text-cyan-300 underline font-bold cursor-pointer" onClick={() => executeCommand("help")}>help</span> for a list of valid commands.
          </p>
        );
        break;
    }

    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdText,
        output: outputContent,
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Shell Drawer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`w-full ${
          isMaximized ? "h-[92vh] max-w-6xl" : "max-w-3xl h-[560px]"
        } glass-panel-elevated rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
      >
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:brightness-125 transition-all"
                title="Close"
              />
              <button
                onClick={() => setLogs([])}
                className="w-3 h-3 rounded-full bg-amber-500 hover:brightness-125 transition-all"
                title="Clear buffer"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-emerald-500 hover:brightness-125 transition-all"
                title="Toggle Maximize"
              />
            </div>
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-slate-300">
              cs-systems-shell // eugene@nust-node-01: ~
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body Scrollable Area */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 font-mono bg-slate-950/90 scanlines"
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-cyan-400 font-semibold">~/cs-portfolio</span>
                <span className="text-slate-400">$ {log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}

          {/* Current input prompt */}
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="text-emerald-400 font-bold">➜</span>
            <span className="text-cyan-400 font-semibold">~/cs-portfolio</span>
            <span className="text-slate-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs caret-emerald-400"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Quick Helper Pill Bar */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span>Quick:</span>
            {["help", "neofetch", "skills", "projects", "algo", "sudo hire", "clear"].map((q) => (
              <button
                key={q}
                onClick={() => executeCommand(q)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-slate-500">Press `ESC` to close</span>
        </div>
      </div>
    </div>
  );
}
