"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BRAWUKA-39 · TiltCard：3D 鼠标微视差倾斜容器。
 * - 指针在卡片平面内按相对位置驱动 rotateX/rotateY（±7° 上限），springs.snappy 回弹。
 * - 触屏（pointer: coarse）与 prefers-reduced-motion 下退化为静态容器，零 JS 开销。
 * - transform-only 动效：无布局读写，保证 Zero CLS。
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 450, damping: 30, mass: 0.8 });
  const rotateY = useSpring(ry, { stiffness: 450, damping: 30, mass: 0.8 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(!coarse && !reduced);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * maxTilt * 2);
    rx.set(-py * maxTilt * 2);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  // NOTE(BRAWUKA-39 review): 始终渲染同一 motion.div，避免 active 翻转时
  // div→motion.div 换型导致整卡子树卸载重挂（CLS + Spotlight 状态丢失）。
  // 降级时仅关闭处理器与 will-change，rotate 值恒为 0 即静态。
  return (
    <motion.div
      ref={ref}
      onMouseMove={active ? handleMove : undefined}
      onMouseLeave={active ? handleLeave : undefined}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={cn(active && "will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
