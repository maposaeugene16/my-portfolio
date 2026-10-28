"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRight,
  Layers,
  Lock,
  Workflow,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { soundFx } from "./SoundManager";

interface ArchitectureStep {
  id: string;
  stageNumber: number;
  title: string;
  role: string;
  tech: string[];
  description: string;
  features: string[];
  metrics: { label: string; value: string };
}

interface ProjectArchitecture {
  id: string;
  name: string;
  tagline: string;
  liveUrl?: string;
  sampleRequest: {
    action: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  steps: ArchitectureStep[];
}

export default function ArchitectureCanvas() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("industry-hub");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceStep, setTraceStep] = useState<number | null>(null);

  const projects: ProjectArchitecture[] = [
    {
      id: "industry-hub",
      name: "Course Shop & Industry Hub",
      tagline: "NUST Final Year Project // Full-Stack Student & Industry Matching Platform",
      liveUrl: "https://course-shop-industry-hub-5tdz.vercel.app",
      sampleRequest: {
        action: "Student Enrolls in an Industry Project Course",
        step1: "Student clicks 'Enroll' on the Next.js UI; client validates session & input.",
        step2: "Secure HTTPS POST sent to API with JWT bearer token and course payload.",
        step3: "Database verifies course availability and commits atomic transaction in PostgreSQL.",
        step4: "Vercel edge updates cache; UI updates instantly with enrollment confirmation.",
      },
      steps: [
        {
          id: "step-frontend",
          stageNumber: 1,
          title: "Client & UI Layer",
          role: "Responsive Next.js Frontend",
          tech: ["Next.js 14", "React", "Tailwind CSS", "TypeScript"],
          description:
            "Modern, mobile-responsive user interface with server-side rendering for quick load times and interactive state management.",
          features: [
            "Server & Client Components for optimal performance",
            "Tailwind CSS for responsive mobile-to-desktop design",
            "Instant client-side validation before network dispatch",
            "Accessible navigation and interactive course catalogs",
          ],
          metrics: { label: "First Contentful Paint", value: "< 0.8s" },
        },
        {
          id: "step-api",
          stageNumber: 2,
          title: "API & Logic Layer",
          role: "Secure RESTful Backend",
          tech: ["Python / Django", "Node.js", "REST APIs", "JWT Auth"],
          description:
            "Stateless backend endpoints handling business logic, role-based access control, and student authentication.",
          features: [
            "JWT token authentication & encrypted password hashing",
            "Strict CORS policies and sanitized request bodies",
            "Course enrollment and industry project matching algorithms",
            "Structured JSON API responses with HTTP status codes",
          ],
          metrics: { label: "Average API Response", value: "~45ms" },
        },
        {
          id: "step-db",
          stageNumber: 3,
          title: "Database Layer",
          role: "Relational Data Persistence",
          tech: ["PostgreSQL", "Supabase", "SQL Relational Schema"],
          description:
            "Robust relational database storing user profiles, course inventories, industry partner postings, and enrollment records.",
          features: [
            "ACID-compliant transactions preventing duplicate enrollments",
            "Foreign-key relational integrity across students & courses",
            "Indexed queries for instant catalog search and filtering",
            "Encrypted connection strings and automated data backups",
          ],
          metrics: { label: "Query Execution", value: "< 12ms" },
        },
        {
          id: "step-cloud",
          stageNumber: 4,
          title: "Cloud & Deployment",
          role: "Global Edge Delivery",
          tech: ["Vercel", "Git CI/CD", "Global Edge CDN", "SSL/TLS"],
          description:
            "Automated continuous deployment workflow delivering the platform worldwide with automatic HTTPS and edge caching.",
          features: [
            "Zero-downtime deployments triggered on git push",
            "Global Edge Network caching assets close to users",
            "Automatic SSL certificates and DNS management",
            "Live production monitoring and health diagnostics",
          ],
          metrics: { label: "Uptime SLA", value: "99.9%" },
        },
      ],
    },
    {
      id: "citycasuallink",
      name: "CityCasualLink Platform",
      tagline: "Hackathon Project // Real-Time Casual Work & Employer Connection",
      liveUrl: "https://citycasuallink-au82.vercel.app",
      sampleRequest: {
        action: "Employer Posts a Casual Job Opportunity",
        step1: "Employer fills job details in React UI; instant validation verifies rate & date.",
        step2: "POST request hits the API; employer verified and rate limits enforced.",
        step3: "Job record indexed in database; made instantly queryable by nearby workers.",
        step4: "Live notification broadcast; updated job list served via Vercel edge.",
      },
      steps: [
        {
          id: "step-frontend-ccl",
          stageNumber: 1,
          title: "Client & UI Layer",
          role: "Mobile-First Web App",
          tech: ["React", "Next.js", "Tailwind CSS", "Lucide Icons"],
          description:
            "Designed for workers and employers on mobile devices, ensuring simple one-tap job applications and profile browsing.",
          features: [
            "Lightweight bundle size optimized for 3G/4G mobile connections",
            "Clear visual cards for job requirements, wages, and locations",
            "Quick WhatsApp and phone call triggers for immediate contact",
            "Offline-friendly state persistence",
          ],
          metrics: { label: "Mobile Page Load", value: "< 1.1s" },
        },
        {
          id: "step-api-ccl",
          stageNumber: 2,
          title: "API & Logic Layer",
          role: "Matching & Dispatch API",
          tech: ["Node.js / Express", "REST Endpoints", "JSON Middleware"],
          description:
            "Coordinates communication between casual job seekers and hiring employers with instant job classification.",
          features: [
            "Job category tagging (construction, catering, logistics, retail)",
            "Verification middleware preventing fraudulent postings",
            "Geographic and availability filtering logic",
            "Secure environment variable isolation",
          ],
          metrics: { label: "API Latency", value: "~38ms" },
        },
        {
          id: "step-db-ccl",
          stageNumber: 3,
          title: "Database Layer",
          role: "Job & Worker Registry",
          tech: ["PostgreSQL", "Relational Models", "Connection Pool"],
          description:
            "Stores candidate profiles, verified phone contacts, job descriptions, and application timestamps.",
          features: [
            "Relational models linking employers to posted tasks",
            "Indexed search for job categories and locations",
            "Data privacy protection for worker personal info",
            "Optimized query execution",
          ],
          metrics: { label: "DB Read Latency", value: "< 15ms" },
        },
        {
          id: "step-cloud-ccl",
          stageNumber: 4,
          title: "Cloud & Deployment",
          role: "Production Vercel Host",
          tech: ["Vercel Edge", "GitHub Actions", "HTTPS Encryption"],
          description:
            "Production deployment ensuring 24/7 availability for job seekers across urban and casual labor markets.",
          features: [
            "Fast CDN response times for mobile users across regions",
            "Continuous deployment on every git commit",
            "Standard HTTPS encryption protecting user data",
            "Scalable serverless execution on demand",
          ],
          metrics: { label: "Availability", value: "100%" },
        },
      ],
    },
    {
      id: "zimscore",
      name: "ZIMSCORE Web Platform",
      tagline: "Academic Platform // Online Exam & Score Verification System",
      liveUrl: "https://zimscore.vercel.app",
      sampleRequest: {
        action: "Student Verifies Examination Results",
        step1: "User enters Candidate Number & PIN in the secure result lookup form.",
        step2: "API receives request, hashes sensitive credentials, and checks rate limits.",
        step3: "Database performs indexed search on verified examination records.",
        step4: "Official tamper-evident result statement rendered and returned to user.",
      },
      steps: [
        {
          id: "step-frontend-zim",
          stageNumber: 1,
          title: "Client & UI Layer",
          role: "Secure Verification Portal",
          tech: ["Next.js", "React", "Tailwind CSS", "Client Security"],
          description:
            "Clean, authoritative interface for candidates, schools, and institutions to verify academic credentials.",
          features: [
            "Form field input sanitization preventing injection attacks",
            "Printable result statement layout with official seals",
            "Real-time feedback on invalid or missing candidate IDs",
            "High-contrast, accessible typography for clarity",
          ],
          metrics: { label: "First Load JS", value: "< 85 kB" },
        },
        {
          id: "step-api-zim",
          stageNumber: 2,
          title: "API & Logic Layer",
          role: "Verification Engine",
          tech: ["RESTful API", "Cryptographic Hashing", "Rate Limiter"],
          description:
            "Secure verification microservice enforcing strict rate-limiting to prevent automated scraping of student records.",
          features: [
            "Rate-limiting to thwart brute-force PIN attempts",
            "Zero-trust credential verification logic",
            "Audit trail logging for result queries",
            "Standardized JSON error messaging",
          ],
          metrics: { label: "Verification Speed", value: "~55ms" },
        },
        {
          id: "step-db-zim",
          stageNumber: 3,
          title: "Database Layer",
          role: "Academic Records Vault",
          tech: ["PostgreSQL", "Encrypted Fields", "ACID Quorum"],
          description:
            "Strictly guarded relational tables with academic session records, grades, candidate indexes, and school codes.",
          features: [
            "Deterministic indexing on candidate ID for instantaneous retrieval",
            "Read-only query safeguards for public verification paths",
            "Strict backup retention and recovery policies",
            "Row-level security enforcement",
          ],
          metrics: { label: "Indexed Lookup", value: "< 8ms" },
        },
        {
          id: "step-cloud-zim",
          stageNumber: 4,
          title: "Cloud & Deployment",
          role: "Vercel Cloud Edge",
          tech: ["Vercel", "Git Integration", "SSL Certificate"],
          description:
            "Reliable cloud deployment capable of handling traffic surges during national examination release dates.",
          features: [
            "Auto-scaling serverless capacity during result announcements",
            "High-availability edge routing across regional nodes",
            "Continuous deployment workflow",
            "Complete HTTPS/TLS 1.3 encryption end-to-end",
          ],
          metrics: { label: "Peak Reliability", value: "99.95%" },
        },
      ],
    },
  ];

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const activeStep = currentProject.steps[activeStepIndex];

  // Handle request tracing animation
  const handleTraceRequest = () => {
    if (isTracing) return;
    soundFx.playClick();
    setIsTracing(true);
    setTraceStep(0);
    setActiveStepIndex(0);

    const stepIntervals = [0, 1, 2, 3];
    stepIntervals.forEach((stepIdx) => {
      setTimeout(() => {
        setTraceStep(stepIdx);
        setActiveStepIndex(stepIdx);
        soundFx.playBeep(440 + stepIdx * 120, 0.1, "sine");

        if (stepIdx === 3) {
          setTimeout(() => {
            soundFx.playSuccess();
            setIsTracing(false);
          }, 1200);
        }
      }, stepIdx * 1500);
    });
  };

  const resetTrace = () => {
    soundFx.playClick();
    setIsTracing(false);
    setTraceStep(null);
    setActiveStepIndex(0);
  };

  const getStepIcon = (stageNumber: number) => {
    switch (stageNumber) {
      case 1:
        return <Globe className="w-5 h-5" />;
      case 2:
        return <Server className="w-5 h-5" />;
      case 3:
        return <Database className="w-5 h-5" />;
      case 4:
        return <Cloud className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/20 bg-slate-900/60 shadow-2xl relative">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-2 border border-emerald-500/20">
            <Workflow className="w-3.5 h-3.5" />
            Full-Stack System Architecture
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            How I Engineer & Deploy Web Applications
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A clear walkthrough of how user requests flow from responsive Next.js frontends through secure APIs, relational databases, and Vercel cloud hosting.
          </p>
        </div>

        {/* Action button to trace an example request */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleTraceRequest}
            disabled={isTracing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs font-mono transition-all duration-150 shadow-lg shadow-emerald-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Play className={`w-3.5 h-3.5 fill-slate-950 ${isTracing ? "animate-spin" : ""}`} />
            {isTracing ? `Tracing Step ${(traceStep ?? 0) + 1} of 4...` : "Trace Example Request Flow"}
          </button>
          {traceStep !== null && (
            <button
              onClick={resetTrace}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-all border border-slate-700"
              title="Reset trace"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Project Architecture Selector Tabs */}
      <div className="pt-6 pb-2">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
          Select Real Project Architecture:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProjectId(proj.id);
                  setActiveStepIndex(0);
                  setTraceStep(null);
                }}
                className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10 text-white"
                    : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs tracking-tight">{proj.name}</span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-mono">
                  {proj.tagline.split("//")[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Request Flow Trace Banner (Visible during or after trace) */}
      <div className="my-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-semibold">Active Request Scenario:</span>
            <span className="text-emerald-300 font-bold">{currentProject.sampleRequest.action}</span>
          </div>
          {currentProject.liveUrl && (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-mono underline"
            >
              <span>View Deployed Project</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Step-by-step Request Narrative */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
          <span className="text-slate-400">Current Action: </span>
          {activeStepIndex === 0 && (
            <span className="text-cyan-300 font-medium">{currentProject.sampleRequest.step1}</span>
          )}
          {activeStepIndex === 1 && (
            <span className="text-blue-300 font-medium">{currentProject.sampleRequest.step2}</span>
          )}
          {activeStepIndex === 2 && (
            <span className="text-emerald-300 font-medium">{currentProject.sampleRequest.step3}</span>
          )}
          {activeStepIndex === 3 && (
            <span className="text-amber-300 font-medium">{currentProject.sampleRequest.step4}</span>
          )}
        </div>
      </div>

      {/* Visual 4-Stage Architecture Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {currentProject.steps.map((step, idx) => {
          const isSelected = activeStepIndex === idx;
          const isBeingTraced = traceStep === idx;

          let cardBorder = "border-slate-800 bg-slate-950/60";
          let badgeColor = "bg-slate-800 text-slate-400";
          let iconColor = "text-slate-400";

          if (idx === 0) {
            iconColor = "text-cyan-400";
            if (isSelected) cardBorder = "border-cyan-500 bg-slate-950 shadow-lg shadow-cyan-500/15";
            if (isSelected) badgeColor = "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40";
          } else if (idx === 1) {
            iconColor = "text-blue-400";
            if (isSelected) cardBorder = "border-blue-500 bg-slate-950 shadow-lg shadow-blue-500/15";
            if (isSelected) badgeColor = "bg-blue-500/20 text-blue-300 border border-blue-500/40";
          } else if (idx === 2) {
            iconColor = "text-emerald-400";
            if (isSelected) cardBorder = "border-emerald-500 bg-slate-950 shadow-lg shadow-emerald-500/15";
            if (isSelected) badgeColor = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
          } else if (idx === 3) {
            iconColor = "text-amber-400";
            if (isSelected) cardBorder = "border-amber-500 bg-slate-950 shadow-lg shadow-amber-500/15";
            if (isSelected) badgeColor = "bg-amber-500/20 text-amber-300 border border-amber-500/40";
          }

          return (
            <div
              key={step.id}
              onClick={() => {
                soundFx.playClick();
                setActiveStepIndex(idx);
              }}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer relative group flex flex-col justify-between ${cardBorder} ${
                isBeingTraced ? "ring-2 ring-emerald-400 scale-[1.02]" : ""
              }`}
            >
              <div>
                {/* Header: Stage Number & Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${iconColor}`}>
                      {getStepIcon(step.stageNumber)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      Stage 0{step.stageNumber}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${badgeColor}`}>
                    {isSelected ? "Active Layer" : "Click to View"}
                  </span>
                </div>

                {/* Layer Title & Role */}
                <h4 className="text-white font-bold text-sm tracking-tight group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-xs font-mono mt-0.5 mb-3">{step.role}</p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {step.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom metric info */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{step.metrics.label}</span>
                <span className="font-bold text-white">{step.metrics.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Layer Deep-Dive Inspector */}
      {activeStep && (
        <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-slate-800 animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  STAGE 0{activeStep.stageNumber} // {activeStep.title.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400">({activeStep.role})</span>
              </div>

              <p className="text-slate-200 text-sm leading-relaxed max-w-3xl">
                {activeStep.description}
              </p>

              {/* Key Implementation Highlights */}
              <div className="pt-2">
                <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-2">
                  Key Engineering Responsibilities & Safeguards:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeStep.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-3 shrink-0 lg:w-72">
              <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                Architecture Snapshot
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">PRIMARY STACK</span>
                <span className="text-white font-semibold">{activeStep.tech.join(", ")}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">BENCHMARK METRIC</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {activeStep.metrics.value} ({activeStep.metrics.label})
                </span>
              </div>
              <div className="pt-1 text-[11px] text-slate-400 leading-normal border-t border-slate-800">
                Built to deliver responsive speed, strict data safety, and high reliability in production.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
