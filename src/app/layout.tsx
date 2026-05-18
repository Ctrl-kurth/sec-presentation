import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for that Vercel-like clean look
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEC OJT Final Report | Intern Presentation",
  description: "Interactive Final Report for Computer Engineering OJT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Enforce dark mode at the HTML level
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-zinc-50 antialiased selection:bg-zinc-800 selection:text-white`}>
        {/* Subtle background glow effect centralized for the entire app */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        {children}
      </body>
    </html>
  );
}
