# SEC OJT Final Report - Live Presentation Script

## 1) Opening (30-45 seconds)

Good day everyone. This is our interactive OJT Final Report system for the Securities and Exchange Commission, ICTD Systems Operations Division.

Instead of a static slide deck, this presentation is built as a web-based walkthrough. It combines executive metrics, timeline evidence, and an interactive assistant-style terminal so we can explain both impact and technical implementation.

Today, I will show the full internship output from March to May 2026, including support volume, system deployment work, and training milestones.

---

## 2) Landing Screen + Context (45-60 seconds)

On the landing page, you will see the status badge, report title, and a short summary of scope.

Talk track:
- "This system is designed as a report experience, not only a document."
- "The goal is to make accomplishments traceable through data cards and visual timeline evidence."
- "From here, we initialize the full report view through presenter authentication."

Action:
- Click **Initialize Presentation** (or **Presenter Login** at the top right).

---

## 3) Presenter Login (30-45 seconds)

Before showing detailed records, the system asks for role-based access.

Talk track:
- "We included a presenter access layer so report sections are intentionally revealed during live defense."
- "This keeps the flow controlled and avoids showing all content at once."

Action:
- Sign in as one presenter profile (Kurth or Carlos).
- After login, click **Navigate to Report** if needed.

Bridge line:
- "Now that authentication is complete, we can move to the executive summary and detailed accomplishments."

---

## 4) Executive Summary Metrics (1-2 minutes)

This section highlights measurable output from the OJT period.

Talk track template:
- "We completed **250 total OJT hours**."
- "For this profile, we delivered nearly **300 total completed works**."
- "The workload distribution shows where we created the most operational value."

If presenting as Kurth, emphasize:
- Network/Printer/WiFi incident resolution
- FortiClient and software installation tickets
- Hardware and cable routing tasks
- Specialized trainings (Fortigate and ArcServe)

If presenting as Carlos, emphasize:
- Printer/scanner configuration improvements
- Software formatting and OS reimaging
- Ethernet and access point setup tasks
- General IT support volume

Bridge line:
- "These metrics show quantity and coverage. Next, the timeline shows execution context and photo evidence."

---

## 5) Timeline Accomplishments + Photo Evidence (2-3 minutes)

In this section, each milestone explains what was done and provides matching images from deployment activities.

Talk track:
- "Each timeline node represents a workstream completed during the internship window."
- "Images are grouped per milestone to support validation and documentation."
- "For training milestones, content is further split by label, such as Fortigate and ArcServe, for better traceability."

Actions:
- Scroll through the timeline slowly.
- Use left/right controls on image strips.
- Click one or two images to open and close zoom view.

Suggested emphasis points:
- Real operational tasks completed on actual SEC environments
- Breadth: network, hardware, software, and support operations
- Structure: data-backed summary plus evidence-backed timeline

Bridge line:
- "To make the report interactive for Q&A, we also included a command-style assistant panel."

---

## 6) AI Command Widget Demo (1-2 minutes)

Open the floating terminal-style widget at the bottom-right.

Talk track:
- "This module simulates a command-prompt assistant for fast retrieval of report context during questioning."
- "Instead of searching manually, we can call prepared commands that summarize metrics and profiles."

Live commands to type:
- `help`
- `whoami`
- `ar kurth` (or `ar carlos` depending on profile)
- `stats`

While typing, say:
- "This gives us structured, instant responses that reinforce the same figures shown in the report sections."

Bridge line:
- "So aside from visuals, the system also supports interactive, command-driven explanation during defense."

---

## 7) Technical Value Statement (45-60 seconds)

Talk track:
- "From a systems perspective, this project demonstrates a complete presentation workflow: controlled access, dynamic section rendering, metric visualization, timeline evidence mapping, and interactive command interface."
- "From an operational perspective, it documents internship output in a format that is auditable, understandable, and presentation-ready."

Optional short technical mention:
- "The interface is built in Next.js with component-based sections and dynamic image grouping from report assets."

---

## 8) Closing (30-45 seconds)

Closing line options:
- "In summary, this system presents our OJT impact not only as claims, but as measurable outcomes with contextual evidence."
- "Thank you, and we are ready for questions and live walkthrough requests."

---

## 9) Quick Q&A Fallback Lines (Use as needed)

If asked "Why this format instead of slides?"
- "Because this format supports live evidence navigation, controlled reveal, and interactive querying in one place."

If asked "How is accuracy maintained?"
- "Metrics and milestones are predefined, and timeline images are grouped by mapped milestone labels for consistency."

If asked "What makes this production-relevant?"
- "It mirrors real report systems where access control, structured data display, and traceable documentation are required."

---

## 10) Fast Demo Flow (60-second backup version)

If time is cut short:
1. Open landing page and state objective.
2. Login as presenter.
3. Show executive metrics and call out 2-3 key numbers.
4. Scroll timeline and open one evidence image.
5. Open terminal widget, run `help` and `stats`.
6. Close with impact statement.
