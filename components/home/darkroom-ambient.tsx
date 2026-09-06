"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * BRAWUKA-78 · DarkroomAmbient — 暗房环境背景
 *
 * - 微尘颗粒：canvas rAF 缓慢上浮 + 正弦漂移 + 呼吸闪烁，峰值 alpha ≤ 0.12（禁抢戏）。
 * - 显影液微光：.darkroom-glow 单层径向渐变（--ink-faint），26s 缓慢漂移。
 * - 颜色跟随 data-theme（MutationObserver 重读 --ink-accent）。
 * - prefers-reduced-motion：canvas 不渲染、微光动画由全局门禁熔断，仅余静态微光。
 */

const PARTICLE_COUNT = 26;

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  alpha: number;
}

export function DarkroomAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.008,
      vy: -(0.004 + Math.random() * 0.01),
      phase: Math.random() * Math.PI * 2,
      alpha: 0.04 + Math.random() * 0.08,
    }));

    const readInk = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ink-accent").trim() ||
      "#F3E8D6";
    let ink = readInk();
    const themeObserver = new MutationObserver(() => {
      ink = readInk();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const step = (ts: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(48, ts - last || 16);
      last = ts;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * dt + Math.sin(ts / 2400 + p.phase) * 0.0006 * dt;
        p.y += p.vy * dt;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x = 1.02;
        else if (p.x > 1.02) p.x = -0.02;
        const twinkle = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(ts / 1800 + p.phase));
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, [reduceMotion]);

  return (
    <>
      {/* 显影液微光（reduced-motion 下退化为静态低透明光晕） */}
      <div aria-hidden="true" className="darkroom-glow pointer-events-none fixed inset-0 z-0" />
      {!reduceMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        />
      )}
    </>
  );
}
