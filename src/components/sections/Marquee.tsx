"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { projects } from "@/data/projects";

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const track = ref.current!.querySelector<HTMLElement>(".marquee__track");
      if (!track) return;
      const half = track.scrollWidth / 2;
      gsap.to(track, { x: -half, duration: 28, ease: "none", repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [...projects, ...projects];

  return (
    <section className="marquee" aria-hidden ref={ref}>
      <div className="marquee__track">
        {items.map((p, i) => (
          <span className="marquee__item" key={i}>
            {p.title}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
