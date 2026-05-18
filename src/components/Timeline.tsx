"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reportMilestones } from "@/lib/reporting";

export function Timeline({ user }: { user: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [groupedImages, setGroupedImages] = useState<Record<string, string[]>>({});
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  const [hasOverflow, setHasOverflow] = useState<Record<string, boolean>>({});
  const scrollRefs = useRef<Record<string, HTMLDivElement>>({});
  const milestones = reportMilestones[user] || reportMilestones.kurth;

  useEffect(() => {
    let isMounted = true;

    async function loadImages() {
      try {
        const response = await fetch(`/api/report-images?user=${user}`);
        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (isMounted && data.groupedImages) {
          setGroupedImages(data.groupedImages);
        }
      } catch {
        if (isMounted) {
          setGroupedImages({});
        }
      }
    }

    void loadImages();

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    const measureOverflow = () => {
      const nextOverflow: Record<string, boolean> = {};

      Object.entries(scrollRefs.current).forEach(([key, container]) => {
        nextOverflow[key] = container.scrollWidth > container.clientWidth + 1;
      });

      setHasOverflow(nextOverflow);
    };

    const frame = window.requestAnimationFrame(measureOverflow);
    window.addEventListener("resize", measureOverflow);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureOverflow);
    };
  }, [groupedImages]);

  const scroll = (key: string, direction: "left" | "right") => {
    const container = scrollRefs.current[key];
    if (!container) return;
    
    const scrollAmount = 300;
    const newPosition = (scrollPositions[key] || 0) + (direction === "left" ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
    setScrollPositions(prev => ({ ...prev, [key]: newPosition }));
  };

  return (
    <section className="w-full space-y-12 pb-32">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">OJT Accomplishments (Mar-May 2026)</h2>
        <p className="text-zinc-400">Detailed breakdown of IT workload executed at the Systems Operations Division.</p>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 space-y-12">
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-white ring-4 ring-zinc-950" />
            
            <h3 className="text-xl font-medium text-zinc-100">{m.phase}</h3>
            <p className="mt-2 text-zinc-400 max-w-lg">{m.desc}</p>

            {/* Labeled subsections for phases with labels */}
            {m.labels && m.labels.length > 0 ? (
              <div className="mt-6 space-y-4">
                {m.labels.map((label) => {
                  const labeledPhase = `${m.phase} - ${label}`;
                  const labelImages = groupedImages[labeledPhase] || groupedImages[label] || [];
                  const scrollKey = `${m.phase}-${label}`;
                  return (
                    <div key={label}>
                      <h4 className="text-sm font-semibold text-zinc-200 mb-2">{label}</h4>
                      {labelImages.length > 0 ? (
                        <div className="group relative">
                          <div 
                            ref={(el) => { if (el) scrollRefs.current[scrollKey] = el; }}
                            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
                          >
                            {labelImages.map((img: string, idx: number) => (
                              <img
                                key={idx}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                alt={`${label} image ${idx + 1}`}
                                className="h-32 md:h-40 w-auto rounded-lg object-cover cursor-zoom-in hover:opacity-80 transition-opacity border border-zinc-800 shrink-0 shadow-md"
                              />
                            ))}
                          </div>
                          
                          {/* Scroll Navigation Buttons */}
                          {hasOverflow[scrollKey] && (
                            <>
                              <button
                                onClick={() => scroll(scrollKey, "left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-2 backdrop-blur-md transition-all duration-200 hover:scale-110"
                                aria-label="Scroll left"
                              >
                                <ChevronLeft size={18} className="text-white" />
                              </button>

                              <button
                                onClick={() => scroll(scrollKey, "right")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-2 backdrop-blur-md transition-all duration-200 hover:scale-110"
                                aria-label="Scroll right"
                              >
                                <ChevronRight size={18} className="text-white" />
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-500">No images uploaded yet</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Contextual Image Row for phases without labels */
              (groupedImages[m.phase] || []).length > 0 && (
              <div className="group relative mt-4">
                <div 
                  ref={(el) => { if (el) scrollRefs.current[m.phase] = el; }}
                  className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
                >
                  {(groupedImages[m.phase] || []).map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      alt={`${m.phase} image ${idx + 1}`}
                      className="h-32 md:h-40 w-auto rounded-lg object-cover cursor-zoom-in hover:opacity-80 transition-opacity border border-zinc-800 shrink-0 shadow-md"
                    />
                  ))}
                </div>
                
                {/* Scroll Navigation Buttons */}
                {hasOverflow[m.phase] && (
                  <>
                    <button
                      onClick={() => scroll(m.phase, "left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-2 backdrop-blur-md transition-all duration-200 hover:scale-110"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={18} className="text-white" />
                    </button>

                    <button
                      onClick={() => scroll(m.phase, "right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-2 backdrop-blur-md transition-all duration-200 hover:scale-110"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={18} className="text-white" />
                    </button>
                  </>
                )}
              </div>
            )
            )}
          </motion.div>
        ))}
      </div>

      {/* Option 3: Interactive Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <img
              src={selectedImage}
              alt="Expanded full screen"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-md select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
