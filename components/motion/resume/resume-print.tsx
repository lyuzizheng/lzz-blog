import React from "react";
import {
  RESUME_BASICS,
  CAPABILITY_DIMENSIONS,
  PRINT_EMPLOYMENT,
} from "@/lib/resume";

/**
 * BRAWUKA-39 · ResumePrint：打印 / PDF 导出模式的出版级 A4 简历。
 * - 屏幕上隐藏（`print-only`），仅在 `@media print` 下渲染，见 app/globals.css。
 * - 黑白高对比、无彩色依赖、无交互控件，保证任何打印机一次成型。
 * - 仅收录 verified 事实；tbd 条目永不进入打印版。
 * - 每个区块 `print-avoid-break`（page-break-inside: avoid），杜绝分页断裂。
 */
export function ResumePrint() {
  const verified = CAPABILITY_DIMENSIONS.map((dim) => ({
    ...dim,
    bullets: dim.bullets.filter((b) => b.status === "verified"),
  }));

  return (
    <div className="print-only" aria-label="Printable resume">
      <header className="print-avoid-break print-header">
        <h1 className="print-name">{RESUME_BASICS.name}</h1>
        <p className="print-headline">{RESUME_BASICS.headline}</p>
        <p className="print-meta">
          {RESUME_BASICS.location} · {RESUME_BASICS.email}
        </p>
        <p className="print-meta">{RESUME_BASICS.education}</p>
      </header>

      <section className="print-avoid-break print-section">
        <h2 className="print-h2">Employment</h2>
        {PRINT_EMPLOYMENT.map((job) => (
          <div key={`${job.org}-${job.period}`} className="print-avoid-break print-job">
            <div className="print-job-head">
              <strong>
                {job.org} · {job.role}
              </strong>
              <span>{job.period}</span>
            </div>
            <p>{job.line}</p>
          </div>
        ))}
      </section>

      {verified.map((dim) => (
        <section key={dim.id} className="print-avoid-break print-section">
          <h2 className="print-h2">{dim.title}</h2>
          <ul>
            {dim.bullets.map((bullet) => (
              <li key={bullet.text}>{bullet.text}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
