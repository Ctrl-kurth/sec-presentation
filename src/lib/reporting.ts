export type Milestone = {
  phase: string;
  desc: string;
  labels?: string[];
};

export const reportMilestones: Record<string, Milestone[]> = {
  kurth: [
    {
      phase: "Routine IT Help Desk",
      desc: "Resolved 155 network, printer, and WiFi connectivity issues across multiple department floors over 3 months. Also successfully resolved 24 FortiClient deployment and authentication issues to ensure secure employee access.",
    },
    {
      phase: "Software Provisioning",
      desc: "Completed over 60 software installations including Harbour configurations per-unit as requested by SEC personnel.",
    },
    {
      phase: "Hardware Deployment",
      desc: "Handled physical setups and carried out over 30 hardware level setups and cable installations.",
    },
    {
      phase: "Specialized Technical Training",
      desc: "Completed division-led technical training operations on enterprise systems including Fortigate (March) and ArcServe (April).",
      labels: ["Fortigate", "ArcServe"],
    },
  ],
  carlos: [
    {
      phase: "Print & Scan Infrastructure",
      desc: "Orchestrated the addition of scanner features into 40+ existing printer fleets alongside standard peripheral help desk support.",
    },
    {
      phase: "Workstation Initialization",
      desc: "Handled 50+ software formatting, OS reimaging, unlocking of corrupted PCs, and general terminal provisioning.",
    },
    {
      phase: "Network Topologies",
      desc: "Installed 19 complex Ethernet cable routing structures and removed/replaced outdated generic access points around SEC floors.",
    },
    {
      phase: "General IT Support",
      desc: "Executed over 110 general inquiries concerning internal WiFi network stability and hardware troubleshooting.",
    },
  ],
};

export function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function getMilestonePhases(user: string) {
  return (reportMilestones[user] || reportMilestones.kurth).map((milestone) => milestone.phase);
}

export function getMatchedImageBucketFromFilename(filename: string, milestones: Milestone[]) {
  const baseName = filename.replace(/\.[^.]+$/, "");
  const normalizedFileName = normalizeText(baseName);

  for (const milestone of milestones) {
    const normalizedPhase = normalizeText(milestone.phase);
    if (!normalizedFileName.includes(normalizedPhase)) {
      continue;
    }

    const label = milestone.labels?.find((item) => normalizedFileName.includes(normalizeText(item)));
    return label ? `${milestone.phase} - ${label}` : milestone.phase;
  }

  for (const milestone of milestones) {
    const label = milestone.labels?.find((item) => normalizedFileName.includes(normalizeText(item)));
    if (label) {
      return label;
    }
  }

  return null;
}
