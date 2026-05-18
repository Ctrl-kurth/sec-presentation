"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoginModal({ onAuthChange }: { onAuthChange?: (user: string | null) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener("openLoginModal", handleOpen);
    return () => document.removeEventListener("openLoginModal", handleOpen);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = [
      { user: "kurth", pass: "intern123", role: "Presenter" },
      { user: "carlos", pass: "intern123", role: "Presenter" },
      { user: "sec_sysops", pass: "admin123", role: "Admin" },
    ];

    const user = validUsers.find(
      (u) => u.user === username.toLowerCase() && u.pass === password
    );

    if (user) {
      setIsLoggedIn(true);
      setError("");
      setIsOpen(false);
      onAuthChange?.(user.user);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div className="absolute top-6 right-6 z-40">
        {!isLoggedIn ? (
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors shadow-sm"
          >
            Presenter Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">
              Welcome, <span className="text-zinc-100 font-medium">{username}</span>
            </span>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUsername("");
                setPassword("");
                onAuthChange?.(null);
              }}
              className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors shadow-sm"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <h2 className="mb-2 text-xl font-semibold text-zinc-100">System Access</h2>
              <p className="mb-6 text-sm text-zinc-400">
                Sign in using your presenter or admin credentials.
              </p>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-400">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. kurth, carlos, sec_sysops"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-400">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
                  />
                </div>

                {error && <span className="text-xs text-red-400">{error}</span>}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}