"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Star } from "lucide-react";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Badge } from "@/components/ui";
import { PROJECTS, PROJECT_STATUS_META, type ProjectEntry } from "@/lib/projects";
import { TiltCard } from "./tilt-card";

/**
 * BRAWUKA-39 · StarsBadge：实时 GitHub Stars 微标。
 * - 固定最小宽度（`min-w-[5.5rem]`）+ tabular-nums，加载/失败态不引起 CLS。
 * - `repo` 为空（仓库地址待 owner 确认）时不发起任何请求，直接渲染 TBD 占位。
 * - 请求失败（限流/离线）时静默降级为静态占位，不抛错不重试风暴。
 */
function StarsBadge({ repo }: { repo: string }) {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ stargazers_count?: number }>) : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === "number") {
          setStars(formatStars(data.stargazers_count));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return (
    <span className="inline-flex min-w-[5.5rem] items-center gap-1 font-telemetry text-[11px] tabular-nums text-muted">
      <Star className="h-3 w-3 text-terracotta" />
      {repo ? (stars ?? "☆ --") : "☆ TBD"}
    </span>
  );
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const status = PROJECT_STATUS_META[project.status];
  return (
    <TiltCard
      className={
        project.span === "featured" ? "h-full md:col-span-4" : "h-full md:col-span-2"
      }
    >
      <SpotlightCard className="flex h-full flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between font-telemetry text-[11px] text-muted">
            <span className="tracking-[0.14em]">{project.frame}</span>
            <span className="inline-flex items-center gap-1.5 tracking-[0.14em]">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {project.statusLabel}
            </span>
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium text-primary">
              {project.name}
              <span className="ml-2 align-middle font-telemetry text-[11px] font-normal tracking-[0.14em] text-muted">
                {project.codename}
              </span>
            </h3>
            <p className="mt-1 font-telemetry text-xs tracking-wider text-safelight">
              {project.tagline}
            </p>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted">{project.description}</p>
          {project.incubating && (
            <ul className="space-y-1.5 border-t border-border-plate pt-3">
              {project.incubating.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-telemetry text-xs text-secondary"
                >
                  <FlaskConical className="h-3.5 w-3.5 shrink-0 text-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="telemetry">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border-plate pt-3">
          <StarsBadge repo={project.githubRepo} />
          <div className="flex items-center gap-3 font-telemetry text-[11px]">
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-0.5 text-secondary transition-colors hover:text-primary"
              >
                {link.label.toUpperCase()}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            ))}
            {project.links.length === 0 && (
              <span className="tracking-[0.14em] text-muted">LINKS TBD</span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}

/**
 * BRAWUKA-39 · ProjectsBento：多项目雷达便当盒展台。
 * 响应式：移动端单列 Pocket Zine，平板 2 列，桌面 6 栏 Bento（featured 4 / standard 2）。
 */
export function ProjectsBento() {
  return (
    <section id="projects" aria-label="Featured Expeditions">
      <div className="mb-6 flex items-center justify-between border-b border-border-plate pb-3">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Featured Expeditions
        </h2>
        <span className="font-telemetry text-xs text-muted">{"// PROJECT RADAR"}</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
