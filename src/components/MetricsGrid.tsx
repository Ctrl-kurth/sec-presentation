"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MonitorSmartphone, Wifi, ShieldAlert, Cpu, Printer, HardDrive, Unplug, BookOpen, Clock } from "lucide-react";

const metricsData: Record<string, any[]> = {
  kurth: [
    { title: "Total OJT Hours", value: "250", icon: Clock, colSpan: "col-span-1 lg:col-span-2" },
    { title: "Total Works Completed", value: "300", icon: CheckCircle2, colSpan: "col-span-1 lg:col-span-2" },
    { title: "Network & Printer Issues", value: "155", icon: Wifi, colSpan: "col-span-1" },
    { title: "FortiClient & Software Installs", value: "94", icon: ShieldAlert, colSpan: "col-span-1" },
    { title: "Hardware & Cable Routings", value: "51", icon: Cpu, colSpan: "col-span-1" },
    { title: "Technical Trainings", value: "02", icon: BookOpen, colSpan: "col-span-1" },
  ],
  carlos: [
    { title: "Total OJT Hours", value: "250", icon: Clock, colSpan: "col-span-1 lg:col-span-2" },
    { title: "Total Works Completed", value: "298", icon: CheckCircle2, colSpan: "col-span-1 lg:col-span-2" },
    { title: "Printer & Scanner Configs", value: "109", icon: Printer, colSpan: "col-span-1" },
    { title: "Software & OS Formatting", value: "50", icon: HardDrive, colSpan: "col-span-1" },
    { title: "Network & Ethernet Setups", value: "27", icon: Unplug, colSpan: "col-span-1 lg:col-span-2" },
  ]
};

export function MetricsGrid({ user }: { user: string }) {
  const metrics = metricsData[user] || metricsData.kurth;

  return (
    <section className="w-full space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">Executive Summary</h2>
        <p className="text-zinc-400">Quantifiable impact during the internship period (Mar-May 2026).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group flex flex-col justify-between p-6 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors ${m.colSpan}`}
          >
            <m.icon className="text-zinc-500 group-hover:text-white transition-colors mb-4" size={24} />
            <div>
              <p className="text-sm font-medium text-zinc-400">{m.title}</p>
              <p className="text-4xl font-bold mt-1 text-white">{m.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
