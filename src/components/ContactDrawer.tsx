"use client";

import React, { useState } from "react";
import { Mail, Key, Github, Linkedin, Send, Copy, Check, Sparkles, MessageSquare, ShieldCheck, X, Phone, MapPin, AlertCircle, MessageCircle, FileText, Download } from "lucide-react";
import emailjs from "@emailjs/browser";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { soundFx } from "./SoundManager";
import confetti from "canvas-confetti";

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Sign up free at https://www.emailjs.com/ then fill in your credentials below.
// 1. Go to https://dashboard.emailjs.com/ → Account → API Keys → copy Public Key
// 2. Go to Email Services → Add Service (Gmail) → copy Service ID
// 3. Go to Email Templates → Create Template → copy Template ID
//    In the template, use variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
const EMAILJS_SERVICE_ID  = "service_cw80hpo";
const EMAILJS_TEMPLATE_ID = "template_xuzfgbb";
const EMAILJS_PUBLIC_KEY  = "4inAsbq9OARhAgITD";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSendError(false);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          subject:      formData.subject,
          message:      formData.message,
          reply_to:     formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      soundFx.playSuccess();
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (error) {
      console.error("EmailJS error:", error);
      setIsSubmitting(false);
      setSendError(true);
    }
  };

  const copyPgpKey = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: ${PORTFOLIO_DATA.profile.socials.pgpKeyId} - ${PORTFOLIO_DATA.profile.name}

mQGNBF+8/eEBDADX7gL47Xo/yq64o0iX69d4l87SjS1W1Q3fX30xT9kR3m2L
...
-----END PGP PUBLIC KEY BLOCK-----`);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure Communication Channel"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl glass-panel-elevated rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-mono font-bold text-white text-sm">
              Secure Communications Handshake // TLS 1.3
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6 bg-slate-900/90 font-mono">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Transmission Received</h4>
              <p className="text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Your message has been sent successfully. I will review and reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Direct Communication Channels (Zero Database Required) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp Direct Chat */}
                <a
                  href={PORTFOLIO_DATA.profile.socials.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playSuccess()}
                  className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950/70 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">WhatsApp (Instant Chat)</span>
                    <span className="text-xs text-white font-bold block">
                      +263 775 126 513
                    </span>
                  </div>
                </a>

                {/* Primary Phone Call */}
                <a
                  href="tel:+263775126513"
                  onClick={() => soundFx.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block uppercase">Phone Call (Primary)</span>
                    <span className="text-xs text-slate-200 font-bold block">
                      +263 775 126 513
                    </span>
                  </div>
                </a>

                {/* Secondary Phone Call */}
                <a
                  href="tel:+263713641507"
                  onClick={() => soundFx.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block uppercase">Phone Call (Secondary)</span>
                    <span className="text-xs text-slate-200 font-bold block">
                      +263 713 641 507
                    </span>
                  </div>
                </a>

                {/* SMS Direct Message */}
                <a
                  href={PORTFOLIO_DATA.profile.socials.smsUrl}
                  onClick={() => soundFx.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block uppercase">Direct SMS / Text</span>
                    <span className="text-xs text-slate-200 font-bold block">
                      +263 775 126 513
                    </span>
                  </div>
                </a>

                {/* Primary Email */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.socials.email}?subject=Job%20Inquiry%20via%20Portfolio`}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block uppercase">Primary Email</span>
                    <span className="text-xs text-slate-200 font-bold truncate block">
                      {PORTFOLIO_DATA.profile.socials.email}
                    </span>
                  </div>
                </a>

                {/* LinkedIn Direct */}
                <a
                  href={PORTFOLIO_DATA.profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 block uppercase">LinkedIn InMail / Message</span>
                    <span className="text-xs text-slate-200 font-bold block">
                      linkedin.com/in/eugene-maposa
                    </span>
                  </div>
                </a>

                {/* Residential Address */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 sm:col-span-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block uppercase">Residential Address (CV)</span>
                    <span className="text-xs text-slate-200 font-bold block">
                      {PORTFOLIO_DATA.profile.socials.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Application Pack Download Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-950 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">OFFICIAL APPLICATION PACK</span>
                    <span className="text-xs text-white font-bold block">Eugene Maposa — CV, Degree Certificate & Transcript (PDF)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/Eugene-Maposa-Application-Pack.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono font-medium border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <span>View in Tab</span>
                  </a>
                  <a
                    href="/Eugene-Maposa-Application-Pack.pdf"
                    download="Eugene-Maposa-Application-Pack.pdf"
                    onClick={() => soundFx.playSuccess()}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Identity / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alan Turing"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 outline-none text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Return Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="turing@princeton.edu"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Staff Systems Role // Distributed KV-Engine"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Message Payload
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We loved your Raft consensus implementation and USENIX FAST paper. We would love to discuss..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 outline-none text-xs text-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500">
                      256-bit client-side verified
                    </span>
                    {sendError && (
                      <span className="flex items-center gap-1 text-[10px] text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        Send failed — try emailing directly
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all duration-150 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Transmitting..." : "Dispatch Message"}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
