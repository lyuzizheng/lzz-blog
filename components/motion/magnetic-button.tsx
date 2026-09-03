"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, type HTMLMotionProps } from "framer-motion";
import { motionPhysics } from "@/tokens";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * MagneticButton: Micro-interaction button with physics-based spring attraction.
 * When cursor enters proximity, button shifts toward pointer with decay factor (0.35).
 * On pointer leave, snaps back using the 'snappy' spring preset.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const springConfig = motionPhysics.springs.snappy;
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    x.set(0);
    y.set(0);
  };

  if (reducedMotion) {
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...buttonProps } = props;
    return (
      <button ref={buttonRef} className={className} {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
