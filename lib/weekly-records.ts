export interface WeeklyRecordHighlight {
  title: string;
  body: string;
}

export interface WeeklyRecord {
  period: string;
  dateTime: string;
  atAGlance: string;
  highlights: ReadonlyArray<WeeklyRecordHighlight>;
  calendar: string;
}

/**
 * Personal records are curated by the site owner.
 * The weekly agent workflow must not change this collection.
 */
export const PERSONAL_WEEKLY_RECORDS: ReadonlyArray<WeeklyRecord> = [];

/**
 * Agent-maintained Work records, synchronised from the public-safe
 * Confluence Weekly Record. Keep entries in reverse chronological order.
 */
export const WORK_WEEKLY_RECORDS: ReadonlyArray<WeeklyRecord> = [
  {
    period: "31 Aug–6 Sep 2026",
    dateTime: "2026-08-31",
    atAGlance:
      "6 PRs opened, 7 authored PRs merged (including carry-over work), 7 teammate PRs approved, 2 Jira items completed, 4 Confluence pages contributed to, and 8 accepted work meetings totalling 6 hours.",
    highlights: [
      {
        title: "AI-assisted operations",
        body: "Advanced the workflow across orchestration, document review, and runtime services. Shipped a compact, source-aware transaction classification contract that reuses an existing classifier when available, avoids redundant model evaluation, preserves a safe fallback, and keeps results traceable. This was supported by 3 AI-linking and security working sessions totalling 2.5 hours.",
      },
      {
        title: "Safety, rollout, and roadmap",
        body: "Added a current-state guard before workflow creation, documented the remaining reroute and fallback work, and refreshed the technical roadmap for shadow evaluation, human review, monitoring, and controlled rollout. Weekly planning, service-health review, and solution segmentation added 3 meetings and 2 hours of alignment.",
      },
      {
        title: "Operational and customer experience",
        body: "Completed batched resolution for related name-mismatch cases and preserved unfinished escalation form inputs when reopening the same case. These outcomes closed 2 assigned Jira items.",
      },
      {
        title: "Reliability and diagnosis",
        body: "Fixed a missing profile-ID propagation path in the compensation flow with regression coverage, and traced duplicate escalation and approval/persistence behaviour back to their upstream causes.",
      },
      {
        title: "Collaboration",
        body: "Approved 7 teammate PRs across prompt configuration, runtime dependencies, inference contracts, and tooling; also held one 1-hour 1:1 and a 30-minute cross-team access-control check-in. Codex supported 9 tracked work threads, with Devin CLI used for an additional critical review of the batch-resolution change.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 11 timed work/busy blocks totalling 8 hours 45 minutes. The collaboration totals above count only the 8 accepted meetings; the remainder was one pending-response meeting (45 minutes), one declined meeting (1 hour), and one generic busy block (1 hour).",
  },
  {
    period: "24–30 Aug 2026",
    dateTime: "2026-08-24",
    atAGlance:
      "6 PRs opened, 7 authored PRs merged (including carry-over work), 6 owned Jira items reached a terminal resolution, 156 Slack messages authored, and 10 accepted work meetings totalling 15 hours 30 minutes.",
    highlights: [
      {
        title: "Operational experience",
        body: "Shipped stronger escalation-form validation and a reusable saved-currency preset, reducing avoidable form errors and repeated case-list setup.",
      },
      {
        title: "AI-assisted operations",
        body: "Progressed batch resolution for related name-mismatch cases while hardening cross-service compatibility, search-path quality, and workflow-state handling.",
      },
      {
        title: "Access and reliability",
        body: "Advanced access-control cleanup and reviewed workflow failure behaviour so the linking flow remained bounded and diagnosable.",
      },
      {
        title: "Collaboration",
        body: "Planning, AI-linking, and access-control discussions connected the implementation work across services. Codex supported 8 tracked work threads, while one new Devin CLI session provided an additional implementation or review pass.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 15 timed work/busy blocks totalling 19 hours 5 minutes: 10 accepted meetings (15 hours 30 minutes), 3 pending-response meetings (2 hours 20 minutes), and 2 declined meetings (1 hour 15 minutes). Transparent all-day location entries were excluded.",
  },
  {
    period: "17–23 Aug 2026",
    dateTime: "2026-08-17",
    atAGlance:
      "12 PRs opened, 12 authored PRs merged (including carry-over work), 3 owned Jira items completed, 2 Confluence pages contributed to, 193 Slack messages authored, and 6 accepted work meetings totalling 5 hours 30 minutes.",
    highlights: [
      {
        title: "Workflow contracts",
        body: "Normalised cross-service automation results, metadata, and outcome recording so orchestration, review, and runtime components shared a clearer contract.",
      },
      {
        title: "Observability and retry",
        body: "Added lifecycle visibility around result receipt, evaluation, and completion, while tightening retry and event-processing behaviour.",
      },
      {
        title: "Delivery foundations",
        body: "Improved release and build paths, contract validation, and supporting runtime integration across the AI-linking workflow.",
      },
      {
        title: "Collaboration",
        body: "Architecture and implementation discussions connected the service changes and documentation. Codex supported 12 tracked work threads, and 2 new Devin CLI sessions added focused implementation or review support.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 10 timed work/busy blocks totalling 8 hours 15 minutes: 6 accepted meetings (5 hours 30 minutes), 3 pending-response meetings (2 hours 15 minutes), and one declined meeting (30 minutes).",
  },
  {
    period: "10–16 Aug 2026",
    dateTime: "2026-08-10",
    atAGlance:
      "30 PRs opened, 22 authored PRs merged (including carry-over work), 3 owned Jira items updated with one completed, one Confluence analysis page contributed to, and 4 accepted work meetings totalling 2 hours 45 minutes.",
    highlights: [
      {
        title: "AI-linking and search",
        body: "Hardened linking and search behaviour across services, including bounded search, clearer contracts, result handling, and production performance analysis.",
      },
      {
        title: "Routing and operations",
        body: "Completed the team-selection routing change and progressed related workflow and operational improvements.",
      },
      {
        title: "Tooling and product delivery",
        body: "Advanced authentication, API, progressive-web-app, UI, and test-harness improvements across internal tools.",
      },
      {
        title: "Collaboration",
        body: "Accepted sessions covered weekly planning, service health, AI linking, and access control. Six new visible Devin CLI sessions supported implementation and review work.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 8 timed work/busy blocks totalling 4 hours 45 minutes: 4 accepted meetings (2 hours 45 minutes), 3 pending-response meetings (1 hour 30 minutes), and one declined meeting (30 minutes). Transparent Office and Home location entries were excluded.",
  },
  {
    period: "3–9 Aug 2026",
    dateTime: "2026-08-03",
    atAGlance:
      "14 PRs opened, 11 authored PRs merged (including carry-over work), no owned Jira items or Confluence pages were updated, and 6 accepted work meetings totalled 4 hours.",
    highlights: [
      {
        title: "AI-assisted operations",
        body: "Advanced the linking workflow through interface publication, result metadata, source confirmation, and lifecycle observability.",
      },
      {
        title: "Case and task foundations",
        body: "Improved intake receipts, task handling, and workflow state contracts, keeping cross-service behaviour easier to trace.",
      },
      {
        title: "Platform delivery",
        body: "Progressed authentication, service APIs, product UI, and test-harness work across internal tools.",
      },
      {
        title: "Collaboration",
        body: "The accepted meetings covered planning, service health, AI linking, access control, defect-handling direction, and a 1:1. Eight new visible Devin CLI sessions supported implementation and review work.",
      },
    ],
    calendar:
      "Excluding time off and out-of-office entries, the primary Google Calendar contained 9 timed meeting blocks totalling 10 hours 30 minutes: 6 accepted meetings (4 hours), 2 pending-response meetings (6 hours), and one declined meeting (30 minutes). Three separate time-off or out-of-office blocks and transparent Office/Home entries were excluded from meeting totals.",
  },
  {
    period: "27 Jul–2 Aug 2026",
    dateTime: "2026-07-27",
    atAGlance:
      "10 PRs opened, 11 authored PRs merged (including carry-over work), one owned Jira item completed, 196 Slack messages authored, and 4 accepted work meetings totalled 2 hours 45 minutes.",
    highlights: [
      {
        title: "AI-linking delivery",
        body: "Connected orchestration, document review, runtime, and deployment changes for the linking workflow, including published interfaces and result metadata.",
      },
      {
        title: "Performance and resilience",
        body: "Tightened bounded search fan-out, timeouts, and failure handling so degraded dependencies remained controlled.",
      },
      {
        title: "Safety and evaluation",
        body: "Progressed shadow testing, prompt and version management, allowlisting, and privacy-safe logging.",
      },
      {
        title: "Operations",
        body: "Completed a queue-configuration ownership fix and used planning, on-call, partner, and AI-sync meetings to align the implementation across teams.",
      },
    ],
    calendar:
      "Excluding time off, the primary Google Calendar contained 9 timed meeting blocks totalling 6 hours 45 minutes: 4 accepted meetings (2 hours 45 minutes), 4 pending-response meetings (3 hours), and one declined meeting (1 hour). One separate 9-hour time-off block and transparent Office/Home entries were excluded from meeting totals. No reliable Devin CLI session records were available for this week.",
  },
  {
    period: "20–26 Jul 2026",
    dateTime: "2026-07-20",
    atAGlance:
      "29 PRs opened, 20 authored PRs merged (including carry-over work), 8 teammate PRs reviewed with 7 approved, 3 Confluence pages contributed to, 155 Slack messages authored, and 7 accepted work meetings totalling 7 hours 15 minutes. No currently-owned Jira items were updated or completed.",
    highlights: [
      {
        title: "AI-assisted operations",
        body: "Built the cross-service workflow foundation from orchestration and asynchronous dispatch through document review, model execution, result submission, and shadow evaluation.",
      },
      {
        title: "Structured linking search",
        body: "Delivered typed direct, structured, and historical search paths with richer evidence, while adding the service permissions needed for those paths.",
      },
      {
        title: "Correctness and resilience",
        body: "Bounded search amplification, filtered already-linked results, tightened deduplication and concurrency behaviour, and improved durable execution results and duplicate-submission protection.",
      },
      {
        title: "Collaboration",
        body: "The 8 teammate reviews, 155 Slack follow-ups, 3 design/RFC contributions, and 13 Codex work threads connected implementation, access boundaries, rollout controls, and operational readiness.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 10 timed blocks totalling 12 hours 15 minutes: 7 accepted meetings (7 hours 15 minutes), 2 pending-response meetings (4 hours), and one declined meeting (1 hour). Five transparent Office/Home location entries were excluded.",
  },
  {
    period: "13–19 Jul 2026",
    dateTime: "2026-07-13",
    atAGlance:
      "11 PRs opened, 5 authored PRs merged (including carry-over work), 4 teammate PRs approved, 2 currently-owned Jira items updated with one completed, 3 Confluence pages contributed to, and 203 Slack messages authored.",
    highlights: [
      {
        title: "AI-linking and search",
        body: "Moved search-path design into cross-service delivery, covering matching boundaries, fallback semantics, result evaluation, and backend execution.",
      },
      {
        title: "Workflow contracts",
        body: "Hardened shadow-result evaluation, header compatibility, result submission, timeouts, and service handovers so the workflow remained traceable and safe.",
      },
      {
        title: "Operational reliability",
        body: "Completed a database-connection investigation, progressed an approval-flow support issue, updated operational guidance, and removed legacy case-type assignment behaviour.",
      },
      {
        title: "Collaboration",
        body: "Captured the search-index proposal and supporting operational knowledge, approved 4 teammate PRs, and used 14 Codex work threads for architecture, implementation, and review.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 13 timed blocks totalling 10 hours 30 minutes: 11 accepted events (9 hours 30 minutes), one pending-response meeting (30 minutes), and one declined meeting (30 minutes). The accepted total comprised 9 work/alignment sessions (6 hours 30 minutes) and 2 optional community or wellbeing events (3 hours). Five transparent Office/Home location entries were excluded.",
  },
  {
    period: "6–12 Jul 2026",
    dateTime: "2026-07-06",
    atAGlance:
      "15 PRs opened, 6 authored PRs merged (including carry-over work), 20 teammate PRs approved, one currently-owned Jira item updated, 2 Confluence pages contributed to, 255 Slack messages authored, and 6 accepted meetings totalling 3 hours 50 minutes.",
    highlights: [
      {
        title: "Shadow workflow delivery",
        body: "Connected run lookup, dispatch, result persistence and evaluation, target completion, and backlog consumption for the linking workflow.",
      },
      {
        title: "Reliability and duplicate safety",
        body: "Added completed-run guards, serialized process work, tuned database connectivity, and tightened duplicate-submission and idempotency behaviour.",
      },
      {
        title: "Routing and infrastructure",
        body: "Continued removing legacy case routing while wiring configurable queues, service ingress, and cross-service ownership boundaries.",
      },
      {
        title: "Collaboration",
        body: "20 teammate approvals, 255 Slack follow-ups, and 15 Codex work threads supported reviews across workflow, case-management, platform, manifest, and operational services. No currently-owned Jira item was completed that week.",
      },
    ],
    calendar:
      "The primary Google Calendar contained 13 timed blocks totalling 8 hours 50 minutes: 6 accepted meetings (3 hours 50 minutes), 5 pending-response meetings (3 hours 30 minutes), one tentative meeting (1 hour), and one declined meeting (30 minutes). Five transparent Office/Home location entries were excluded.",
  },
  {
    period: "29 Jun–5 Jul 2026",
    dateTime: "2026-06-29",
    atAGlance:
      "7 PRs opened, 7 authored PRs merged (including carry-over work), 5 teammate PRs approved, one currently-owned Jira item completed, 3 Confluence pages contributed to, 125 Slack messages authored, and 10 accepted meetings totalling 8 hours 15 minutes.",
    highlights: [
      {
        title: "Workflow foundations",
        body: "Shipped result submission, reroute outcomes, shadow-evaluation persistence, process integration, and clearer package and runtime boundaries for automated defect handling.",
      },
      {
        title: "Routing and case lifecycle",
        body: "Simplified queue-state semantics, advanced routing cleanup, and moved non-customer-service case updates toward asynchronous processing.",
      },
      {
        title: "Evaluation and rollout",
        body: "Developed the safety, evaluation, shadow-mode, monitoring, and phased-rollout approach while aligning requirements for an AI-assisted workflow.",
      },
      {
        title: "Collaboration",
        body: "The RFC and retrospective contributions, 5 teammate approvals, 125 Slack messages, and 7 Codex work threads connected delivery with planning, compliance, platform, and operational stakeholders.",
      },
    ],
    calendar:
      "Excluding time off, the primary Google Calendar contained 15 timed blocks totalling 11 hours: 10 accepted meetings (8 hours 15 minutes), 4 pending-response meetings (2 hours 15 minutes), and one declined meeting (30 minutes). One separate 4-hour time-off block and five transparent Office/Home location entries were excluded from meeting totals.",
  },
];

export const WORK_RECORDS_SOURCE_NOTE =
  "Slack totals reflect retained, accessible indexed conversations. Confluence totals are page-level contributions. Jira totals use tickets currently assigned to the author and updated or resolved in each week because historical assignee snapshots are unavailable. Codex totals use retained user-visible work threads. The retained Devin CLI session database begins on 3 Aug 2026. Calendar totals use the primary calendar only. Sensitive identifiers, private links, confidential metrics, and incident details are omitted.";
