"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Terminal,
  ArrowLeft,
  ExternalLink,
  Cpu,
  Network,
  Globe,
  Layers,
  Server
} from "lucide-react";

export default function JobsPage() {
  const router = useRouter();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jobOptions = [
    {
      id: "UTIL_NODE_01",
      title: "JobCopilot (Auto Apply)",
      description: "Automated routing engine designed to cross-reference and batch-submit application data packets to hundreds of target endpoints seamlessly.",
      icon: <Network size={16} />,
      href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot",
      type: "DATA_PIPELINE"
    },
    {
      id: "UTIL_NODE_02",
      title: "FinalRound AI",
      description: "Advanced simulation runtime tailored to optimize and prepare developer profiles for rigorous systemic tech interviews and screening blocks.",
      icon: <Cpu size={16} />,
      href: "https://www.finalroundai.com/?via=browncode",
      type: "AI_ENGINE"
    },
    {
      id: "UTIL_NODE_03",
      title: "HostAfrica Domain Engine",
      description: "Global registry allocation system. Provision and resolve high-performance top-level domain nodes for system backbones.",
      icon: <Globe size={16} />,
      href: "https://my.hostafrica.com/aff.php?aff=2657",
      type: "DNS_PROVISION"
    },
    {
      id: "UTIL_NODE_04",
      title: "eSkilled AI Creator",
      description: "Automated content block model built to orchestrate, sequence, and output full digital educational course architectures.",
      icon: <Layers size={16} />,
      href: "https://aicoursecreator.eskilled.io/?fpr=brown99",
      type: "LOGIC_SYNTH"
    },
    {
      id: "UTIL_NODE_05",
      title: "Swagbucks Knowledge Base",
      description: "Distributed manual verification engine where system operators execute micro-tasks and validation scripts for reward payloads.",
      icon: <Server size={16} />,
      href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1",
      type: "COMPUTE_TRACK"
    },
  ];

  const handleBack = () => {
    router.push("/portfolio");
  };

  return (
    <>
      {/* Top Navigation Frame */}
      <nav className="relative z-10 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-[9999]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <Terminal size={18} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
            <a href="/">
              <span className="text-sm font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                BROWN_CODE_DEV // UTILITIES_ROUTER
              </span>
            </a>
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-950/80 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>SYS.RETURN()</span>
          </a>
        </div>
      </nav>

      <div className="min-h-screen bg-[#050811] text-slate-400 font-mono antialiased relative pt-24 pb-20">
        {/* Engineering Blueprint Grid Wireframe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0d_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

        <main className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">

          {/* CONTROL SECTION TERMINAL HEADER */}
          <section className="border border-slate-900 bg-[#0b132b]/20 p-6 sm:p-8 rounded-sm relative backdrop-blur-sm">
            <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-[#050811] px-2 text-[10px] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1">
              <Terminal size={10} /> SYS_UTILITIES_ROUTER // CONFIG
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  External Career & Pipeline Gateways
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Execute direct connections to external automation layers, development resource instances, and production career enhancement toolsets.
                </p>
              </div>

              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 rounded-sm transition-all uppercase tracking-wider shrink-0"
              >
                <ArrowLeft size={12} /> ESC_RETURN()
              </button>
            </div>
          </section>

          {/* UTILITY HOOK CARDS MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobOptions.map((job) => (
              <a
                key={job.id}
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-950 border border-slate-900 hover:border-slate-800 p-5 rounded-sm flex flex-col justify-between space-y-6 transition-all duration-300 shadow-md relative"
              >
                {/* Visual Accent Corner on Hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[6px] border-r-[6px] border-t-transparent border-r-transparent group-hover:border-t-cyan-500 group-hover:border-r-cyan-500 transition-all duration-300"></div>

                <div className="space-y-4">
                  {/* Card Meta telemetry block */}
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    <span>{job.id}</span>
                    <span className="text-cyan-500 bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-900/30 text-[9px]">
                      {job.type}
                    </span>
                  </div>

                  {/* Title Node */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0">
                      {job.icon}
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors pt-1">
                      {job.title}
                    </h3>
                  </div>

                  {/* System Functional Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {job.description}
                  </p>
                </div>

                {/* Secure Redirect Bridge Button */}
                <div className="pt-2">
                  <div className="w-full text-center inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-900/60 border border-slate-800/80 group-hover:border-cyan-500/20 text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 transition-all uppercase tracking-wider rounded-sm">
                    REDIRECT_TO_TARGET()
                    <ExternalLink size={10} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* DIAGNOSTIC ERROR BOUNDARY NOTE */}
          <div className="text-center pt-4">
            <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">
              // END_OF_STREAM: ALL EXTERNAL INTERFACES LISTENING OK
            </span>
          </div>

        </main>
      </div>
    </>
  );
}