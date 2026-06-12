"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Mail, X, Terminal, Radio } from "lucide-react";

export default function FloatingContact({ onChatOpen }) {
  const [showContactIcons, setShowContactIcons] = useState(false);
  const contactRef = useRef(null);

  const handleChatClick = () => {
    onChatOpen();
    setShowContactIcons(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setShowContactIcons(false);
      }
    };
    if (showContactIcons) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContactIcons]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <div className="relative flex flex-col items-end">
        {/* ===== FLOATING SUB-MODULE POPULARIS ===== */}
        {showContactIcons && (
          <div
            ref={contactRef}
            className="flex flex-col gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            {/* WhatsApp Protocol Node */}
            <a
              href="https://wa.me/qr/RX4M5D4PGB7CO1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-full shadow-xl hover:bg-emerald-500 hover:text-white hover:border-emerald-400 hover:scale-110 transition-all duration-200 group relative"
              title="WhatsApp Gateway"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="absolute right-14 bg-slate-950 text-slate-400 border border-slate-800 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                COMMS // WA
              </span>
            </a>

            {/* SMTP Mail Node */}
            <a
              href="mailto:browncemmanuel@gmail.com"
              className="flex items-center justify-center w-12 h-12 bg-rose-950/80 border border-rose-500/40 text-rose-400 rounded-full shadow-xl hover:bg-rose-500 hover:text-white hover:border-rose-400 hover:scale-110 transition-all duration-200 group relative"
              title="Mail Routing Client"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute right-14 bg-slate-950 text-slate-400 border border-slate-800 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                COMMS // SMTP
              </span>
            </a>

            {/* Native Core Live Chat Node */}
            <button
              onClick={handleChatClick}
              className="flex items-center justify-center w-12 h-12 bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all duration-200 group relative"
              title="Establish Platform Interface"
            >
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="absolute right-14 bg-slate-950 text-slate-400 border border-slate-800 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                COMMS // MATRIX
              </span>
            </button>
          </div>
        )}

        {/* ===== TERMINAL TRIGGER INTERFACE BUTTON ===== */}
        <button
          onClick={() => setShowContactIcons(!showContactIcons)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 relative border backdrop-blur-md ${showContactIcons
              ? "bg-slate-950 border-rose-500/50 text-rose-400 hover:border-rose-400 shadow-rose-950/20"
              : "bg-slate-950 border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:scale-105 shadow-cyan-950/30"
            }`}
          aria-label="Toggle Communications Core"
        >
          {showContactIcons ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <Terminal className="w-5 h-5 z-10" />
              <span className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping opacity-40"></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}