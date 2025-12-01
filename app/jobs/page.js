// app/jobs/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import { Sparkles, Home, Briefcase, Clock, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobsPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("portfolioScam");

  const jobOptions = [
    {
      title: "JobCopilot (Auto Apply)",
      description: "Discover and Apply to hundreds of jobs automatically",
      icon: <Sparkles size={24} className="text-purple-400" />,
      href: "https://jobcopilot.com/?linkId=lp_494205&sourceId=brown-oziomachi&tenantId=jobcopilot",
      external: true,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "FinalRound AI",
      description:
        "FinalRoundAI excels in preparing job seekers for the final stages of the hiring process",
      icon: <Home size={20} className="text-blue-400" />,
      href: "https://www.finalroundai.com/?via=browncode",
      external: true,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Purchase a domain at HostAfrica",
      description: "Find the perfect domain for your business!",
      icon: <Briefcase size={24} className="text-green-400" />,
      href: "https://my.hostafrica.com/aff.php?aff=2657",
      external: true,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "eSkilled",
      description: "AI Course Creator - Your Powerful Online Course Maker",
      icon: <Clock size={24} className="text-orange-400" />,
      href: "https://aicoursecreator.eskilled.io/?fpr=brown99",
      external: true,
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "Prove your knowledge | Earn money",
      description: "Launch your career with hands-on learning experiences",
      icon: <GraduationCap size={20} className="text-indigo-400" />,
      href: "https://www.swagbucks.com/p/register?rb=202240461&rp=1",
      external: true,
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  const JobCard = ({ job }) => (
    <a
      href={job.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-6 rounded-xl bg-black/80 bg-gradient-to-br ${job.gradient} 
        hover:scale-105 transition-all duration-300 border border-gray-700/50 
        hover:border-gray-500 flex flex-col gap-4`}
    >
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-800/50 rounded-lg">{job.icon}</div>
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
          {job.title}
        </h3>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{job.description}</p>
    </a>
  );

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      {/* ✅ Navbar added and fully working */}
      <Navbar
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          activeSection={activeSection}
      />
      <main className="min-h-screen bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <section
            id="jobs"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6  bg-gradient-to-r from-cyan-600 to-cyan-800-600 bg-clip-text text-transparent lg:mt-20">
              Explore Online Job Opportunities
            </h1>

            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Find flexible online jobs, internships, and AI-powered career
              tools that fit your goals. Click any option to start your journey
              today!
            </p>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobOptions.map((job, idx) => (
                <JobCard key={idx} job={job} />
              ))}
            </div>

            <button
              onClick={handleBack}
              className="mt-10 px-10 py-3  bg-gradient-to-r from-cyan-600 to-cyan-800-600 rounded-lg cursor-pointer"
            >
              Back
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
