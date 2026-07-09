"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const track = ref.current!.querySelector<HTMLElement>(".marquee__track");
      if (!track) return;
      const half = track.scrollWidth / 2;
      gsap.to(track, { x: -half, duration: 22, ease: "none", repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="marquee" aria-hidden ref={ref}>
      <div className="marquee__track">
        {Array.from({ length: 2 }).map((_, i) => (
          <span className="marquee__item" key={i}>
            NO FEAR<span className="dot">●</span>NO FINISH LINE
            <span className="dot">●</span>JUST THE WORK
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
