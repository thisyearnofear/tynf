"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finish = () => {
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: reduce ? 0.2 : 1,
        ease: "expo.inOut",
        onComplete,
      });
    };

    if (reduce) {
      if (countRef.current) countRef.current.textContent = "100";
      finish();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(counter.v);
        if (countRef.current) countRef.current.textContent = String(v);
        if (barRef.current) gsap.set(barRef.current, { scaleX: v / 100 });
      },
    });
    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    });
    tl.add(onComplete, "<0.1");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="preloader">
      <div className="preloader__label">thisyearnofear — loading the work</div>
      <span ref={countRef} className="preloader__count">
        0
      </span>
      <div ref={barRef} className="preloader__bar" />
    </div>
  );
}
