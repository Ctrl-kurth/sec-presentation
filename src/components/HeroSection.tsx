"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function HeroSection({ user }: { user?: string | null }) {
  const handleAction = () => {
    if (user) {
      const target = document.getElementById('report-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      document.dispatchEvent(new CustomEvent('openLoginModal'));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
          <Terminal size={14} />
          <span>Status: OJT Completed Successfully</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          Securities & Exchange Commission
          <br className="max-md:hidden" /> OJT Final Report
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-zinc-400">
          A comprehensive overview of IT help desk operations, software & hardware deployments, 
          and FortiClient troubleshooting executed during my internship at the ICTD - Systems Operations Division.
        </p>

        <div className="pt-8">
          <button 
            onClick={handleAction}
            className="px-6 py-3 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            {user ? "Navigate to Report" : "Initialize Presentation"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
