"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReaderColophon, ReaderEyebrow } from "@/components/posts/reader-chrome";
import { useI18n } from "@/lib/i18n";
import {
  PERSONAL_WEEKLY_RECORDS,
  WORK_RECORDS_SOURCE_NOTE,
  WORK_WEEKLY_RECORDS,
  type WeeklyRecord,
} from "@/lib/weekly-records";

type RecordTab = "personal" | "work";

function RecordsTimeline({
  records,
  atAGlanceLabel,
  calendarLabel,
  latestLabel,
}: {
  records: ReadonlyArray<WeeklyRecord>;
  atAGlanceLabel: string;
  calendarLabel: string;
  latestLabel: string;
}) {
  return (
    <ol className="relative space-y-14 before:absolute before:bottom-0 before:left-[5px] before:top-2 before:w-px before:bg-[var(--border-plate)] md:space-y-20 md:before:left-[9.5rem]">
      {records.map((record, index) => (
        <li
          key={record.dateTime}
          className="relative grid gap-5 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-12"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-ink-dominant bg-substrate md:left-[calc(9.5rem-5px)]"
          />

          <div className="pl-7 md:pl-0">
            <time
              dateTime={record.dateTime}
              className="font-telemetry text-[11px] leading-5 tracking-[0.1em] text-ink-dominant tabular-nums"
            >
              {record.period}
            </time>
            {index === 0 && (
              <span className="mt-2 block font-telemetry text-[9px] tracking-[0.18em] text-muted">
                {latestLabel}
              </span>
            )}
          </div>

          <article className="min-w-0 border-t border-border-plate pl-7 pt-5 md:pl-8 md:pt-6">
            <h3 className="font-display text-xl leading-8 text-primary sm:text-2xl">
              {atAGlanceLabel}
            </h3>
            <p className="mt-3 max-w-[72ch] text-pretty text-sm font-medium leading-7 text-secondary sm:text-base sm:leading-8">
              {record.atAGlance}
            </p>

            <ul className="mt-7 divide-y divide-border-plate/60">
              {record.highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="grid gap-2 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
                >
                  <h4 className="font-display text-base leading-7 text-primary">
                    {highlight.title}
                  </h4>
                  <p className="max-w-[72ch] text-pretty text-sm leading-7 text-secondary">
                    {highlight.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-y border-border-plate bg-chamber/35 px-4 py-4 sm:px-5">
              <p className="font-telemetry text-[10px] tracking-[0.14em] text-ink-dominant">
                {calendarLabel}
              </p>
              <p className="mt-2 max-w-[75ch] text-pretty text-xs leading-6 text-secondary sm:text-sm">
                {record.calendar}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

export function WeeklyRecords() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<RecordTab>("work");
  const latest = WORK_WEEKLY_RECORDS[0];
  const oldest = WORK_WEEKLY_RECORDS.at(-1);

  const tabs = [
    {
      id: "personal" as const,
      label: t.weeklyRecords.personal,
      count: PERSONAL_WEEKLY_RECORDS.length,
    },
    {
      id: "work" as const,
      label: t.weeklyRecords.work,
      count: WORK_WEEKLY_RECORDS.length,
    },
  ];

  const panelMotion = {
    initial: reducedMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: reducedMotion ? undefined : { opacity: 0 },
    transition: { duration: reducedMotion ? 0 : 0.2, ease: "easeOut" as const },
  };

  return (
    <div className="relative min-h-screen bg-substrate text-primary transition-colors duration-300">
      <ReaderEyebrow />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="animate-latent-develop mb-12 border-b border-border-plate pb-10 sm:mb-16 sm:pb-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-balance font-display text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-primary sm:text-6xl">
                {t.weeklyRecords.title}
              </h1>
              <p className="mt-5 max-w-xl text-pretty font-body text-base leading-8 text-secondary sm:text-lg">
                {t.weeklyRecords.subtitle}
              </p>
            </div>
            <p className="font-telemetry text-[11px] leading-6 tracking-[0.12em] text-muted tabular-nums lg:max-w-64 lg:text-right">
              {WORK_WEEKLY_RECORDS.length} {isZh ? "周" : "WEEKS"}
              <br />
              {oldest?.period} — {latest?.period}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={isZh ? "每周记录分区" : "Weekly record sections"}
            className="mt-10 grid grid-cols-2 border-y border-border-plate"
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-baseline justify-between gap-2 px-2 py-4 text-left transition-colors sm:px-4 ${
                    index === 0 ? "border-r border-border-plate" : ""
                  } ${
                    isActive
                      ? "bg-chamber/35 text-ink-dominant"
                      : "text-primary hover:bg-chamber/20 hover:text-ink-dominant"
                  }`}
                >
                  <span className="font-display text-xl sm:text-2xl">{tab.label}</span>
                  <span className="font-telemetry text-[9px] tracking-[0.12em] text-muted tabular-nums sm:text-[10px] sm:tracking-[0.16em]">
                    {tab.count} {isZh ? "条" : "RECORDS"}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-ink-dominant"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "personal" ? (
            <motion.section
              key="personal"
              id="personal-panel"
              role="tabpanel"
              aria-labelledby="personal-tab"
              tabIndex={0}
              {...panelMotion}
            >
              <div className="grid gap-7 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-12">
                <div>
                  <h2 className="text-balance font-display text-3xl text-primary sm:text-4xl">
                    {t.weeklyRecords.personal}
                  </h2>
                  <p className="mt-3 max-w-sm text-pretty text-sm leading-7 text-secondary">
                    {t.weeklyRecords.personalDescription}
                  </p>
                </div>
                {PERSONAL_WEEKLY_RECORDS.length === 0 && (
                  <div className="flex min-h-44 items-center border-y border-dashed border-border-plate py-10">
                    <p className="max-w-xl font-display text-xl leading-8 text-muted">
                      {t.weeklyRecords.personalEmpty}
                    </p>
                  </div>
                )}
              </div>

              {PERSONAL_WEEKLY_RECORDS.length > 0 && (
                <div className="mt-14 border-t border-border-plate pt-12">
                  <RecordsTimeline
                    records={PERSONAL_WEEKLY_RECORDS}
                    atAGlanceLabel={t.weeklyRecords.atAGlance}
                    calendarLabel={t.weeklyRecords.calendarCoverage}
                    latestLabel={isZh ? "最新记录" : "LATEST EXPOSURE"}
                  />
                </div>
              )}
            </motion.section>
          ) : (
            <motion.section
              key="work"
              id="work-panel"
              role="tabpanel"
              aria-labelledby="work-tab"
              tabIndex={0}
              {...panelMotion}
            >
              <div className="mb-14 flex flex-col gap-5 sm:mb-18 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-balance font-display text-4xl text-primary sm:text-5xl">
                    {t.weeklyRecords.work}
                  </h2>
                  <p className="mt-4 text-pretty text-sm leading-7 text-secondary sm:text-base">
                    {t.weeklyRecords.workDescription}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-ink-dominant px-3 py-1 font-telemetry text-[10px] tracking-[0.14em] text-ink-dominant">
                  {t.weeklyRecords.agentMaintained}
                </span>
              </div>

              <RecordsTimeline
                records={WORK_WEEKLY_RECORDS}
                atAGlanceLabel={t.weeklyRecords.atAGlance}
                calendarLabel={t.weeklyRecords.calendarCoverage}
                latestLabel={isZh ? "最新记录" : "LATEST EXPOSURE"}
              />

              <aside className="mt-16 border-t border-border-plate pt-5 sm:ml-48">
                <p className="max-w-[72ch] text-pretty font-telemetry text-[10px] leading-6 tracking-[0.04em] text-muted">
                  {t.weeklyRecords.coverageNote}
                </p>
                <p className="mt-3 max-w-[72ch] text-pretty text-xs leading-6 text-muted">
                  {WORK_RECORDS_SOURCE_NOTE}
                </p>
              </aside>
            </motion.section>
          )}
        </AnimatePresence>

        <ReaderColophon />
      </main>
    </div>
  );
}
