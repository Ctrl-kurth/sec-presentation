"use client";

import { Terminal, X } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KURTH_CONTEXT = `Kurth Angelo B. Espiritu - SEC Internship (Mar-May 2026)
Total OJT Hours: 250
Works Completed: 300
Key Accomplishments:
- Resolved 155 network, printer, and WiFi connectivity issues.
- Solved 94 FortiClient & Software install tickets (incl. Harbour software).
- Completed 51 Hardware & Cable routing tasks.
- Participated in 2 Specialized Technical Trainings: Fortigate (March) and ArcServe (April).`;

const CARLOS_CONTEXT = `San Gabriel, Carlos Miguel - SEC Internship (Mar-May 2026)
Total OJT Hours: 250
Works Completed: 298
Key Accomplishments:
- Executed over 110 general inquiries concerning internal WiFi & hardware troubleshooting.
- Orchestrated scanner feature additions into 40+ existing printer fleets.
- Handled 50+ software formatting, OS reimaging, and unlocking of corrupted PCs.
- Installed 19 complex Ethernet cable routings and managed generic access points.`;

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
    { type: "output", text: "Microsoft Windows [Version 10.0.19045.3803]" },
    { type: "output", text: "(c) Microsoft Corporation. All rights reserved." },
    { type: "output", text: "" },
    { type: "output", text: "Type 'help' to see available commands." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const command = inputValue.trim().toLowerCase();
      
      const newHistory = [...history, { type: "input" as const, text: `C:\\Users\\Interns> ${inputValue}` }];
      
      let response = "";
      if (command === "help") {
        response = `Available commands:
  help       - Show this message
  clear      - Clear the terminal screen
  whoami     - Show current context
  ar kurth   - Display Kurth's Accomplishment Report
  ar carlos  - Display Carlos's Accomplishment Report
  stats      - Show raw internship metrics`;
      } else if (command === "clear" || command === "cls") {
        setHistory([]);
        setInputValue("");
        return;
      } else if (command === "whoami") {
        response = "cur_user: SEC Intern / System Role: AIChat Assistant";
      } else if (command === "ar kurth" || command === "kurth") {
        response = KURTH_CONTEXT;
      } else if (command === "ar carlos" || command === "carlos") {
        response = CARLOS_CONTEXT;
      } else if (command === "stats") {
        response = `[KURTH METRICS] Works: 300 | Network: 155 | Software/FortiClient: 94 | Hardware: 51 | Trainings: 2\n[CARLOS METRICS] Works: 298 | Printer/Scanner: 109 | Formatting/OS: 50 | Ethernet/AP: 27`;
      } else {
        response = `'${command}' is not recognized as an internal or external command, operable program or batch file. Type 'help' to see available commands.`;
      }
      
      // Split newlines into separate output lines if needed
      const responseLines = response.split('\n').map(line => ({ type: "output" as const, text: line }));
      
      setHistory([...newHistory, ...responseLines]);
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-4 w-[450px] border border-white/20 bg-gradient-to-b from-zinc-900/80 to-black/80 shadow-2xl flex flex-col font-mono backdrop-blur-md rounded-lg overflow-hidden"
          >
            {/* CMD Title Bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-white/10 to-white/5 border-b border-white/10 text-white px-3 py-2 select-none hover:from-white/15 hover:to-white/10 transition-all">
              <div className="flex items-center gap-2">
                <Terminal size={14} />
                <span className="text-xs font-bold font-sans tracking-wide">Command Prompt</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-red-500/80 hover:text-white p-0.5 rounded transition-colors" aria-label="Close terminal" title="Close">
                <X size={14} />
              </button>
            </div>

            {/* CMD Content */}
            <div 
              ref={containerRef}
              className="p-3 h-72 overflow-y-auto text-zinc-300 text-xs flex flex-col cursor-text bg-black/40 hover:bg-black/50 transition-colors"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap text-zinc-400">{line.text}</div>
              ))}
              
              <div className="flex items-center mt-1">
                <span className="mr-1 text-zinc-500">C:\Users\Interns&gt;</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-300 focus:ring-0 p-0 caret-white"
                  autoComplete="off"
                  aria-label="Command line input"
                  title="Command line input"
                  spellCheck="false"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat component"
        title="Toggle chat component"
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 text-white hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
      >
        <Terminal size={20} />
      </button>
    </div>
  );
}
