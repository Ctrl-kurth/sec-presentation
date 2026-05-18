"use client";

import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MetricsGrid } from "@/components/MetricsGrid";
import { Timeline } from "@/components/Timeline";
import { AIChatWidget } from "@/components/AIChatWidget";
import { LoginModal } from "@/components/LoginModal";
import { motion, AnimatePresence } from "framer-motion";

export default function PresentationPage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start overflow-x-hidden">
      {/* Top right presenter login */}
      <LoginModal onAuthChange={(user) => setCurrentUser(user)} />

      {/* Container max-width designed for 1080p optimal viewing */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-24 space-y-32">
        <HeroSection user={currentUser} />
        
        <AnimatePresence mode="wait">
          {currentUser && (currentUser === "kurth" || currentUser === "carlos") && (
            <motion.div
              id="report-content"
              key={currentUser}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-32 pt-24 -mt-24" // Added padding & negative margin for scroll offset
            >
              <MetricsGrid user={currentUser} />
              <Timeline user={currentUser} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Floating Agent Mockup */}
      <AIChatWidget />
    </main>
  );
}
